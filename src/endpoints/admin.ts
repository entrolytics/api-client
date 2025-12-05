import type { ApiClient } from '../client';

export interface AdminOrgParams {
  orgId: string;
}

export interface AdminUserParams {
  userId: string;
}

export interface AdminWebsiteParams {
  websiteId: string;
}

export function createAdminEndpoints(client: ApiClient) {
  return {
    /**
     * Get all organizations (admin only)
     */
    getOrgs: () => client.get('/admin/orgs'),

    /**
     * Get organization details (admin only)
     */
    getOrg: ({ orgId }: AdminOrgParams) => client.get(`/admin/orgs/${orgId}`),

    /**
     * Get all users (admin only)
     */
    getUsers: () => client.get('/admin/users'),

    /**
     * Get user details (admin only)
     */
    getUser: ({ userId }: AdminUserParams) => client.get(`/admin/users/${userId}`),

    /**
     * Get all websites (admin only)
     */
    getWebsites: () => client.get('/admin/websites'),

    /**
     * Get website details (admin only)
     */
    getWebsite: ({ websiteId }: AdminWebsiteParams) => client.get(`/admin/websites/${websiteId}`),

    /**
     * Run admin setup
     */
    setup: () => client.post('/admin/setup', {}),
  };
}
