import type { ApiClient } from '../client';

export interface ConfigResponse {
  cloudMode: string;
  cloudUrl: string;
  defaultDateRange: number;
  defaultTimezone: string;
  disableBot: boolean;
  disableLogin: boolean;
  disableTelemetry: boolean;
  disableUI: boolean;
  forceSSL: boolean;
  hostname: string;
  isTelemetryEnabled: boolean;
  trackingCodeScriptUrl: string;
  uiDisabled: boolean;
  version: string;
}

export function createConfigEndpoints(client: ApiClient) {
  return {
    /**
     * Get system configuration
     */
    get: () => client.get<ConfigResponse>('/config'),
  };
}
