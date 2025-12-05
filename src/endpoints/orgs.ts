import type { ApiClient } from '../client';
import type {
  ApiResponse,
  CreateOrgData,
  JoinOrgData,
  Organization,
  OrgUser,
  UpdateOrgData,
  Website,
} from '../types';

export function createOrgsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all organizations for the current user.
     */
    getOrgs(): Promise<ApiResponse<Organization[]>> {
      return client.get<Organization[]>('/orgs');
    },

    /**
     * Create a new organization.
     */
    createOrg(data: CreateOrgData): Promise<ApiResponse<Organization>> {
      return client.post<Organization>('/orgs', data);
    },

    /**
     * Join an organization using access code.
     */
    joinOrg(data: JoinOrgData): Promise<ApiResponse<Organization>> {
      return client.post<Organization>('/orgs/join', data);
    },

    /**
     * Get an organization by ID.
     */
    getOrg(orgId: string): Promise<ApiResponse<Organization>> {
      return client.get<Organization>(`/orgs/${orgId}`);
    },

    /**
     * Update an organization.
     */
    updateOrg(orgId: string, data: UpdateOrgData): Promise<ApiResponse<Organization>> {
      return client.post<Organization>(`/orgs/${orgId}`, data);
    },

    /**
     * Delete an organization.
     */
    deleteOrg(orgId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/orgs/${orgId}`);
    },

    /**
     * Get organization members.
     */
    getOrgUsers(orgId: string): Promise<ApiResponse<OrgUser[]>> {
      return client.get<OrgUser[]>(`/orgs/${orgId}/users`);
    },

    /**
     * Add a user to an organization.
     */
    addOrgUser(
      orgId: string,
      data: { userId: string; role: 'admin' | 'member' | 'view-only' },
    ): Promise<ApiResponse<OrgUser>> {
      return client.post<OrgUser>(`/orgs/${orgId}/users`, data);
    },

    /**
     * Update an organization member's role.
     */
    updateOrgUser(
      orgId: string,
      userId: string,
      data: { role: 'admin' | 'member' | 'view-only' },
    ): Promise<ApiResponse<OrgUser>> {
      return client.post<OrgUser>(`/orgs/${orgId}/users/${userId}`, data);
    },

    /**
     * Remove a user from an organization.
     */
    removeOrgUser(orgId: string, userId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/orgs/${orgId}/users/${userId}`);
    },

    /**
     * Get organization websites.
     */
    getOrgWebsites(orgId: string): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>(`/orgs/${orgId}/websites`);
    },

    /**
     * Add a website to an organization.
     */
    addOrgWebsite(orgId: string, data: { websiteId: string }): Promise<ApiResponse<Website>> {
      return client.post<Website>(`/orgs/${orgId}/websites`, data);
    },

    /**
     * Remove a website from an organization.
     */
    removeOrgWebsite(orgId: string, websiteId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/orgs/${orgId}/websites/${websiteId}`);
    },
  };
}
