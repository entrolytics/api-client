import type { CliAccessTokenMetadata } from '@entrolytics/shared';
import type { ApiClient } from '../client';
import type { ApiResponse } from '../types';

export function createAuthEndpoints(client: ApiClient) {
  return {
    /**
     * List all active CLI access tokens for the current user.
     */
    listCliTokens(): Promise<ApiResponse<CliAccessTokenMetadata[]>> {
      return client.get<CliAccessTokenMetadata[]>('/auth/cli/tokens');
    },

    /**
     * Revoke a specific CLI access token by its JTI.
     *
     * @param jti - The JWT ID of the token to revoke
     */
    revokeCliToken(jti: string): Promise<ApiResponse<{ message: string }>> {
      return client['request']<{ message: string }>('/auth/cli/tokens', {
        method: 'DELETE',
        body: { jti },
      });
    },

    /**
     * Revoke all CLI access tokens for the current user.
     */
    revokeAllCliTokens(): Promise<ApiResponse<{ message: string; count: number }>> {
      return client['request']<{ message: string; count: number }>('/auth/cli/tokens', {
        method: 'DELETE',
        body: { revokeAll: true },
      });
    },
  };
}
