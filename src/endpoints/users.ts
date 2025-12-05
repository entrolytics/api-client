import type { ApiClient } from '../client';
import type { ApiResponse, CreateUserData, UpdateUserData, User, Website } from '../types';

export function createUsersEndpoints(client: ApiClient) {
  return {
    /**
     * Get all users (admin only).
     */
    getUsers(): Promise<ApiResponse<User[]>> {
      return client.get<User[]>('/users');
    },

    /**
     * Create a new user (admin only).
     */
    createUser(data: CreateUserData): Promise<ApiResponse<User>> {
      return client.post<User>('/users', data);
    },

    /**
     * Get a user by ID.
     */
    getUser(userId: string): Promise<ApiResponse<User>> {
      return client.get<User>(`/users/${userId}`);
    },

    /**
     * Update a user.
     */
    updateUser(userId: string, data: UpdateUserData): Promise<ApiResponse<User>> {
      return client.post<User>(`/users/${userId}`, data);
    },

    /**
     * Delete a user (admin only).
     */
    deleteUser(userId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/users/${userId}`);
    },

    /**
     * Get websites belonging to a user.
     */
    getUserWebsites(userId: string): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>(`/users/${userId}/websites`);
    },

    /**
     * Get user usage statistics.
     */
    getUserUsage(
      userId: string,
      params: { startAt: number; endAt: number },
    ): Promise<ApiResponse<{ websiteCount: number; eventCount: number }>> {
      return client.get(`/users/${userId}/usage`, params);
    },
  };
}
