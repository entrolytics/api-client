import type { ApiClient } from '../client';
import type { ApiResponse, Organization, User, Website } from '../types';

export function createMeEndpoints(client: ApiClient) {
  return {
    /**
     * Get current user profile.
     */
    getMe(): Promise<ApiResponse<User>> {
      return client.get<User>('/me');
    },

    /**
     * Update current user's password.
     */
    updateMyPassword(data: {
      currentPassword: string;
      newPassword: string;
    }): Promise<ApiResponse<void>> {
      return client.post<void>('/me/password', data);
    },

    /**
     * Get current user's websites.
     */
    getMyWebsites(): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>('/me/websites');
    },

    /**
     * Get current user's organizations.
     */
    getMyOrgs(): Promise<ApiResponse<Organization[]>> {
      return client.get<Organization[]>('/me/orgs');
    },
  };
}
