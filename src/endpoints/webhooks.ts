import type { ApiClient } from '../client';

export interface WebhookClerkParams {
  data: unknown;
}

export function createWebhooksEndpoints(client: ApiClient) {
  return {
    /**
     * Handle Clerk webhook
     */
    clerk: (params: WebhookClerkParams) => client.post('/webhooks/clerk', params.data),
  };
}
