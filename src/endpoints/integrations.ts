import type { ApiClient } from '../client';

export interface IntegrationWordPressParams {
  data: unknown;
}

export function createIntegrationsEndpoints(client: ApiClient) {
  return {
    /**
     * Handle WordPress integration
     */
    wordpress: (params: IntegrationWordPressParams) =>
      client.post('/integrations/wordpress', params.data),
  };
}
