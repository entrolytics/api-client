import type { ApiResponse } from './types';

export interface ClientConfig {
  /** API endpoint URL (e.g., 'https://analytics.example.com/api') */
  endpoint?: string;
  /** Bearer token for Clerk-authenticated requests */
  bearerToken?: string;
  /** API key for programmatic access */
  apiKey?: string;
  /** User ID for self-hosted authentication (legacy) */
  userId?: string;
  /** Secret for self-hosted authentication (legacy) */
  secret?: string;
  /** Custom fetch implementation */
  fetch?: typeof fetch;
  /** Number of retry attempts for failed requests (default: 3) */
  retries?: number;
  /** Base delay between retries in ms (default: 1000) */
  retryDelay?: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

/**
 * Core API client for making authenticated requests.
 */
export class ApiClient {
  private endpoint: string;
  private bearerToken?: string;
  private apiKey?: string;
  private userId?: string;
  private secret?: string;
  private fetchFn: typeof fetch;
  private retries: number;
  private retryDelay: number;

  constructor(config: ClientConfig = {}) {
    // Helper to safely access process.env (edge runtime compatible)
    const getEnv = (key: string): string | undefined => {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
      }
      return undefined;
    };

    this.endpoint = config.endpoint || getEnv('ENTROLYTICS_API_ENDPOINT') || '';
    this.bearerToken = config.bearerToken || getEnv('ENTROLYTICS_BEARER_TOKEN');
    this.apiKey = config.apiKey || getEnv('ENTROLYTICS_API_KEY');
    this.userId = config.userId || getEnv('ENTROLYTICS_USER_ID');
    this.secret = config.secret || getEnv('ENTROLYTICS_SECRET');
    this.fetchFn = config.fetch || globalThis.fetch;
    this.retries = config.retries ?? 3;
    this.retryDelay = config.retryDelay ?? 1000;

    if (!this.endpoint) {
      throw new Error(
        'Entrolytics API endpoint is required. Set ENTROLYTICS_API_ENDPOINT or pass endpoint in config.',
      );
    }
  }

  /**
   * Update the bearer token (useful for token refresh).
   */
  setBearerToken(token: string): void {
    this.bearerToken = token;
  }

  /**
   * Generate authentication headers.
   * Priority: Bearer token > API key > Legacy share token
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.bearerToken) {
      // Clerk JWT Bearer token authentication
      headers.Authorization = `Bearer ${this.bearerToken}`;
    } else if (this.apiKey) {
      // API key authentication
      headers['x-entrolytics-api-key'] = this.apiKey;
    } else if (this.userId && this.secret) {
      // Legacy self-hosted authentication
      headers['x-entrolytics-share-token'] = this.createShareToken();
    }

    return headers;
  }

  /**
   * Create a share token for self-hosted authentication (legacy).
   * @deprecated Use bearerToken or apiKey instead
   */
  private createShareToken(): string {
    if (!this.userId || !this.secret) {
      throw new Error('userId and secret are required for self-hosted authentication');
    }

    // Simple base64 token for backwards compatibility
    // New integrations should use bearerToken or apiKey
    const payload = {
      userId: this.userId,
      timestamp: Date.now(),
    };

    // Edge-compatible base64 encoding (use btoa instead of Buffer)
    if (typeof Buffer !== 'undefined') {
      // Node.js environment
      return Buffer.from(JSON.stringify(payload)).toString('base64');
    } else {
      // Edge/Browser environment
      return btoa(JSON.stringify(payload));
    }
  }

  /**
   * Sleep helper for retry delays.
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if error is retryable.
   */
  private isRetryable(status: number): boolean {
    return status === 0 || status === 429 || status >= 500;
  }

  /**
   * Build URL with query parameters.
   */
  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    const url = new URL(path, this.endpoint);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Make an authenticated API request with automatic retries.
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, params, headers = {} } = options;

    const url = this.buildUrl(path, params);
    let lastError: ApiResponse<T> | null = null;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const fetchOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...this.getAuthHeaders(),
            ...headers,
          },
        };

        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }

        const response = await this.fetchFn(url, fetchOptions);

        const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

        if (!response.ok) {
          const errorMessage =
            typeof data.error === 'string'
              ? data.error
              : typeof data.message === 'string'
                ? data.message
                : `HTTP ${response.status}`;

          lastError = {
            ok: false,
            status: response.status,
            error: errorMessage,
          };

          // Retry on 5xx errors and rate limits
          if (this.isRetryable(response.status) && attempt < this.retries) {
            const delay = this.retryDelay * 2 ** attempt;
            await this.sleep(delay);
            continue;
          }

          return lastError;
        }

        return {
          ok: true,
          status: response.status,
          data: data as T,
        };
      } catch (error) {
        lastError = {
          ok: false,
          status: 0,
          error: error instanceof Error ? error.message : 'Network error',
        };

        // Retry on network errors
        if (attempt < this.retries) {
          const delay = this.retryDelay * 2 ** attempt;
          await this.sleep(delay);
        }
      }
    }

    return (
      lastError ?? {
        ok: false,
        status: 0,
        error: 'Request failed after retries',
      }
    );
  }

  /**
   * GET request helper.
   */
  get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'GET', params });
  }

  /**
   * POST request helper.
   */
  post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'POST', body });
  }

  /**
   * PUT request helper.
   */
  put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PUT', body });
  }

  /**
   * DELETE request helper.
   */
  delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'DELETE' });
  }

  /**
   * PATCH request helper.
   */
  patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PATCH', body });
  }
}
