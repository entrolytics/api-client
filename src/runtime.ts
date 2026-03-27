/**
 * Runtime detection utilities for Node.js vs Edge environments
 *
 * @module runtime
 * @example
 * ```ts
 * import { detectRuntime, isNodeRuntime, isEdgeRuntime } from 'entro-api/runtime';
 *
 * // Detect current runtime
 * const runtime = detectRuntime();
 * console.log(runtime); // 'node' | 'edge' | 'unknown'
 *
 * // Check specific runtime
 * if (isNodeRuntime()) {
 *   // Use Node.js-specific features
 * }
 *
 * if (isEdgeRuntime()) {
 *   // Use edge-compatible features only
 * }
 * ```
 */

export type Runtime = "node" | "edge" | "unknown";

/**
 * Detect the current JavaScript runtime environment
 *
 * @returns {Runtime} The detected runtime ('node', 'edge', or 'unknown')
 *
 * @example
 * ```ts
 * const runtime = detectRuntime();
 *
 * switch (runtime) {
 *   case 'node':
 *     console.log('Running in Node.js');
 *     break;
 *   case 'edge':
 *     console.log('Running in Edge Runtime');
 *     break;
 *   default:
 *     console.log('Unknown runtime');
 * }
 * ```
 */
export function detectRuntime(): Runtime {
  type GlobalEdge = typeof globalThis & {
    EdgeRuntime?: unknown;
    Deno?: unknown;
    process?: { versions?: { node?: string } };
  };

  const globalRef = globalThis as GlobalEdge;
  const isNode = typeof globalRef.process?.versions?.node === "string";
  const hasEdgeRuntime = typeof globalRef.EdgeRuntime !== "undefined";
  const hasDeno = typeof globalRef.Deno !== "undefined";
  const hasWebAssembly = typeof WebAssembly !== "undefined";
  const hasResponse = typeof Response !== "undefined";

  // Check for Edge Runtime indicators
  if (hasEdgeRuntime || hasDeno || (hasWebAssembly && hasResponse && !isNode)) {
    return "edge";
  }

  // Check for Node.js indicators
  if (typeof process !== "undefined" && process.versions != null && process.versions.node != null) {
    return "node";
  }

  return "unknown";
}

/**
 * Check if code is running in Node.js runtime
 *
 * @returns {boolean} True if running in Node.js
 *
 * @example
 * ```ts
 * if (isNodeRuntime()) {
 *   // Safe to use Node.js-only features
 *   const fs = require('fs');
 *   const data = fs.readFileSync('file.txt');
 * }
 * ```
 */
export function isNodeRuntime(): boolean {
  return detectRuntime() === "node";
}

/**
 * Check if code is running in Edge runtime
 *
 * @returns {boolean} True if running in Edge runtime (Vercel, Netlify, Cloudflare)
 *
 * @example
 * ```ts
 * if (isEdgeRuntime()) {
 *   // Use only edge-compatible features
 *   const response = await fetch('https://api.example.com');
 * }
 * ```
 */
export function isEdgeRuntime(): boolean {
  return detectRuntime() === "edge";
}

/**
 * Get runtime capabilities
 *
 * @returns Runtime capabilities object
 *
 * @example
 * ```ts
 * const capabilities = getRuntimeCapabilities();
 *
 * if (capabilities.supportsFileSystem) {
 *   // Can use fs module
 * }
 *
 * if (capabilities.supportsWebCrypto) {
 *   // Can use Web Crypto API
 * }
 * ```
 */
export function getRuntimeCapabilities() {
  const runtime = detectRuntime();

  return {
    runtime,
    isNode: runtime === "node",
    isEdge: runtime === "edge",
    supportsFileSystem: runtime === "node",
    supportsWebCrypto: typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined",
    supportsFetch: typeof fetch !== "undefined",
    supportsStreams: typeof ReadableStream !== "undefined",
  };
}

/**
 * Assert that code is running in a specific runtime
 *
 * @param {Runtime} expected - The expected runtime
 * @throws {Error} If not running in the expected runtime
 *
 * @example
 * ```ts
 * // Ensure we're in edge runtime
 * assertRuntime('edge');
 *
 * // Now safe to use edge-only features
 * export const runtime = 'edge';
 * ```
 */
export function assertRuntime(expected: Runtime): void {
  const actual = detectRuntime();
  if (actual !== expected) {
    throw new Error(
      `Expected ${expected} runtime, but detected ${actual}. ` +
        `This code requires ${expected} runtime to function correctly.`,
    );
  }
}
