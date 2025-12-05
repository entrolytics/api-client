import type { ApiClient } from '../client';
import type { ApiResponse, CreateLinkData, Link, UpdateLinkData } from '../types';

export function createLinksEndpoints(client: ApiClient) {
  return {
    /**
     * Get all links.
     */
    getLinks(): Promise<ApiResponse<Link[]>> {
      return client.get<Link[]>('/links');
    },

    /**
     * Get links for an organization.
     */
    getOrgLinks(orgId: string): Promise<ApiResponse<Link[]>> {
      return client.get<Link[]>(`/orgs/${orgId}/links`);
    },

    /**
     * Create a new link.
     */
    createLink(orgId: string, data: CreateLinkData): Promise<ApiResponse<Link>> {
      return client.post<Link>(`/orgs/${orgId}/links`, data);
    },

    /**
     * Get a link by ID.
     */
    getLink(linkId: string): Promise<ApiResponse<Link>> {
      return client.get<Link>(`/links/${linkId}`);
    },

    /**
     * Update a link.
     */
    updateLink(linkId: string, data: UpdateLinkData): Promise<ApiResponse<Link>> {
      return client.post<Link>(`/links/${linkId}`, data);
    },

    /**
     * Delete a link.
     */
    deleteLink(linkId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/links/${linkId}`);
    },
  };
}
