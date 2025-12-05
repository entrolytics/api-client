/**
 * Edge runtime helper utilities
 *
 * Provides edge-compatible environment variable access, fetch utilities,
 * and common patterns for edge deployments (Vercel, Netlify, Cloudflare).
 *
 * @module edge-helpers
 * @example
 * ```ts
 * import { getEdgeEnv, createEdgeFetch, getRegionInfo } from 'entro-api/edge-helpers';
 *
 * // Access environment variables safely
 * const apiKey = getEdgeEnv('API_KEY', 'default-key');
 *
 * // Create a fetch wrapper with retries
 * const edgeFetch = createEdgeFetch({ retries: 3 });
 * const response = await edgeFetch('https://api.example.com');
 *
 * // Get deployment region information
 * const region = getRegionInfo();
 * console.log(`Running in ${region.provider} region ${region.region}`);
 * ```
 */

/**
 * Safely access environment variables in edge runtime
 *
 * @param {string} key - Environment variable name
 * @param {string} [defaultValue] - Optional default value if variable not found
 * @returns {string | undefined} The environment variable value or default
 *
 * @example
 * ```ts
 * // With default value
 * const apiKey = getEdgeEnv('API_KEY', 'fallback-key');
 *
 * // Without default (returns undefined if not found)
 * const optionalVar = getEdgeEnv('OPTIONAL_VAR');
 * ```
 */
export function getEdgeEnv(key: string, defaultValue?: string): string | undefined {
  // Try process.env first (works in many edge runtimes)
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key];
    if (value !== undefined) return value;
  }

  // Try Deno.env for Netlify Edge Functions
  // @ts-ignore - Deno global
  if (typeof Deno !== 'undefined' && typeof Deno.env !== 'undefined') {
    try {
      // @ts-ignore
      return Deno.env.get(key) || defaultValue;
    } catch {
      // Deno.env.get can throw if permissions denied
    }
  }

  return defaultValue;
}

/**
 * Check if a required environment variable is set
 *
 * @param {string} key - Environment variable name
 * @throws {Error} If the required variable is not set
 *
 * @example
 * ```ts
 * // Throws if DATABASE_URL is not set
 * requireEdgeEnv('DATABASE_URL');
 * ```
 */
export function requireEdgeEnv(key: string): string {
  const value = getEdgeEnv(key);
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

export interface EdgeFetchOptions extends RequestInit {
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Base delay between retries in ms (default: 1000) */
  retryDelay?: number;
  /** Timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Create an edge-compatible fetch wrapper with retries and timeout
 *
 * @param {EdgeFetchOptions} [defaultOptions] - Default options for all requests
 * @returns {Function} Enhanced fetch function
 *
 * @example
 * ```ts
 * const edgeFetch = createEdgeFetch({
 *   retries: 3,
 *   retryDelay: 1000,
 *   timeout: 10000,
 * });
 *
 * // Fetch with automatic retries
 * const response = await edgeFetch('https://api.example.com/data');
 * ```
 */
export function createEdgeFetch(defaultOptions: EdgeFetchOptions = {}) {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 30000,
    ...fetchDefaults
  } = defaultOptions;

  return async function edgeFetch(
    input: RequestInfo | URL,
    options?: EdgeFetchOptions,
  ): Promise<Response> {
    const finalRetries = options?.retries ?? retries;
    const finalDelay = options?.retryDelay ?? retryDelay;
    const finalTimeout = options?.timeout ?? timeout;
    const finalOptions = { ...fetchDefaults, ...options };

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= finalRetries; attempt++) {
      try {
        // Create timeout signal
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), finalTimeout);

        const response = await fetch(input, {
          ...finalOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Don't retry on successful responses or client errors (4xx)
        if (response.ok || (response.status >= 400 && response.status < 500)) {
          return response;
        }

        // Retry on server errors (5xx)
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on abort errors (timeout)
        if (lastError.name === 'AbortError') {
          throw new Error(`Request timeout after ${finalTimeout}ms`);
        }
      }

      // Wait before retrying (exponential backoff)
      if (attempt < finalRetries) {
        const delay = finalDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError || new Error('Request failed');
  };
}

export interface RegionInfo {
  /** Cloud provider (vercel, netlify, cloudflare, unknown) */
  provider: 'vercel' | 'netlify' | 'cloudflare' | 'unknown';
  /** Region code (e.g., 'iad1', 'us-east-1') */
  region?: string;
  /** Whether running in edge runtime */
  isEdge: boolean;
}

/**
 * Get information about the current edge deployment region
 *
 * @returns {RegionInfo} Information about the deployment region
 *
 * @example
 * ```ts
 * const region = getRegionInfo();
 *
 * if (region.provider === 'vercel') {
 *   console.log(`Running in Vercel region: ${region.region}`);
 * }
 * ```
 */
export function getRegionInfo(): RegionInfo {
  // Vercel Edge Runtime
  if (getEdgeEnv('VERCEL')) {
    return {
      provider: 'vercel',
      region: getEdgeEnv('VERCEL_REGION'),
      isEdge: getEdgeEnv('VERCEL_EDGE_RUNTIME') === '1',
    };
  }

  // Netlify Edge Functions
  // @ts-ignore
  if (typeof Deno !== 'undefined' && getEdgeEnv('NETLIFY')) {
    return {
      provider: 'netlify',
      region: getEdgeEnv('NETLIFY_REGION'),
      isEdge: true,
    };
  }

  // Cloudflare Workers
  // @ts-ignore
  if (typeof caches !== 'undefined' && typeof WebAssembly !== 'undefined') {
    return {
      provider: 'cloudflare',
      region: undefined, // Cloudflare doesn't expose region
      isEdge: true,
    };
  }

  return {
    provider: 'unknown',
    isEdge: false,
  };
}

/**
 * Extract geo information from edge request
 *
 * @param {Request} request - The incoming Request object
 * @returns {Object} Geo information extracted from headers
 *
 * @example
 * ```ts
 * export async function POST(request: Request) {
 *   const geo = getGeoFromRequest(request);
 *   console.log(`Request from: ${geo.country}, ${geo.city}`);
 * }
 * ```
 */
export function getGeoFromRequest(request: Request) {
  const headers = request.headers;

  // Vercel Edge geo headers
  const vercelCountry = headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return {
      country: vercelCountry,
      region: headers.get('x-vercel-ip-country-region'),
      city: headers.get('x-vercel-ip-city'),
      latitude: headers.get('x-vercel-ip-latitude'),
      longitude: headers.get('x-vercel-ip-longitude'),
    };
  }

  // Cloudflare Workers geo
  const cfCountry = headers.get('cf-ipcountry');
  if (cfCountry) {
    return {
      country: cfCountry,
      region: headers.get('cf-region'),
      city: headers.get('cf-city'),
      latitude: headers.get('cf-latitude'),
      longitude: headers.get('cf-longitude'),
    };
  }

  // Netlify Edge geo (from context, not headers directly)
  return {
    country: undefined,
    region: undefined,
    city: undefined,
    latitude: undefined,
    longitude: undefined,
  };
}

/**
 * Get client IP address from edge request
 *
 * @param {Request} request - The incoming Request object
 * @returns {string | undefined} The client IP address
 *
 * @example
 * ```ts
 * export async function POST(request: Request) {
 *   const clientIp = getClientIp(request);
 *   console.log(`Request from IP: ${clientIp}`);
 * }
 * ```
 */
export function getClientIp(request: Request): string | undefined {
  const headers = request.headers;

  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    headers.get('x-vercel-forwarded-for') ||
    undefined
  );
}
