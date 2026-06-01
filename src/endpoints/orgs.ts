import type { ApiClient } from "../client";
import type {
  ApiResponse,
  CreateOrgData,
  JoinOrgData,
  OrgMember,
  Organization,
  UpdateOrgData,
  Website,
} from "../types";

export function createOrgsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all organizations for the current user.
     */
    getOrgs(): Promise<ApiResponse<Organization[]>> {
      return client.get<Organization[]>("/orgs");
    },

    /**
     * Create a new organization.
     */
    createOrg(data: CreateOrgData): Promise<ApiResponse<Organization>> {
      return client.post<Organization>("/orgs", data);
    },

    /**
     * Join an organization using access code.
     */
    joinOrg(data: JoinOrgData): Promise<ApiResponse<Organization>> {
      return client.post<Organization>("/orgs/join", data);
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
      return client.patch<Organization>(`/orgs/${orgId}`, data);
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
    getOrgMembers(orgId: string): Promise<ApiResponse<OrgMember[]>> {
      return client.get<OrgMember[]>(`/orgs/${orgId}/members`);
    },

    /**
     * Invite a member to an organization.
     */
    inviteOrgMember(
      orgId: string,
      data: { email: string; role: "admin" | "member" | "viewer" },
    ): Promise<ApiResponse<void>> {
      return client.post<void>(`/orgs/${orgId}/members`, data);
    },

    /**
     * Update an organization member's role.
     */
    updateOrgMember(
      orgId: string,
      memberId: string,
      data: { role: "admin" | "member" | "viewer" },
    ): Promise<ApiResponse<OrgMember>> {
      return client.patch<OrgMember>(`/orgs/${orgId}/members/${memberId}`, data);
    },

    /**
     * Remove a member from an organization.
     */
    removeOrgMember(orgId: string, memberId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/orgs/${orgId}/members/${memberId}`);
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
