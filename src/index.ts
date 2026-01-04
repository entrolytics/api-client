import { ApiClient, type ClientConfig } from './client';
import {
  createAdminEndpoints,
  createAuthEndpoints,
  createBillingEndpoints,
  createBoardsEndpoints,
  createConfigEndpoints,
  createEventsEndpoints,
  createIntegrationsEndpoints,
  createLinksEndpoints,
  createMeEndpoints,
  createOrgsEndpoints,
  createPixelsEndpoints,
  createReportsEndpoints,
  createSegmentsEndpoints,
  createSessionsEndpoints,
  createUsersEndpoints,
  createWebhooksEndpoints,
  createWebsitesEndpoints,
} from './endpoints';

export type { ClientConfig } from './client';
// Re-export only constants and utilities from shared (not type definitions to avoid conflicts)
export {
  PLANS,
  PLAN_FEATURES,
  USAGE_THRESHOLDS,
  BILLING_ERRORS,
  API_ENDPOINTS,
  DEFAULT_API_HOST,
  ENV_VAR_NAMES,
  CLI_CONFIG,
  EVENT_TYPES,
  VITAL_TYPES,
  VITAL_RATINGS,
  VITAL_THRESHOLDS,
  NAVIGATION_TYPES,
  FORM_EVENT_TYPES,
  FORM_FIELD_TYPES,
  DEPLOYMENT_SOURCES,
  DEPLOYMENT_ENV_VARS,
  HTTP_STATUS,
  API_ROUTES,
  ONBOARDING_STEPS,
  CLI_TOKEN_STATUS,
  USER_ROLES,
  FRAMEWORK_PACKAGES,
  FRAMEWORK_PATTERNS,
  RATE_LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  getEnvVarNames,
  getFrameworkPackage,
  isValidFramework,
  getApiRoute,
  getPlan,
  isPlanFeatureEnabled,
  getPlanLimit,
  isUsageWarning,
  isUsageCritical,
  getVitalRating,
  detectDeploymentContext,
} from '@entrolytics/shared';
// Export all local types (API-specific type definitions)
export * from './types';

/**
 * Entrolytics API client with all endpoints.
 */
export interface EntrolyticsClient {
  // Auth endpoints (CLI token management)
  auth: ReturnType<typeof createAuthEndpoints>;

  // Me endpoints
  getMe: ReturnType<typeof createMeEndpoints>['getMe'];
  updateMyPassword: ReturnType<typeof createMeEndpoints>['updateMyPassword'];
  getMyWebsites: ReturnType<typeof createMeEndpoints>['getMyWebsites'];
  getMyOrgs: ReturnType<typeof createMeEndpoints>['getMyOrgs'];

  // User endpoints
  getUsers: ReturnType<typeof createUsersEndpoints>['getUsers'];
  createUser: ReturnType<typeof createUsersEndpoints>['createUser'];
  getUser: ReturnType<typeof createUsersEndpoints>['getUser'];
  updateUser: ReturnType<typeof createUsersEndpoints>['updateUser'];
  deleteUser: ReturnType<typeof createUsersEndpoints>['deleteUser'];
  getUserWebsites: ReturnType<typeof createUsersEndpoints>['getUserWebsites'];
  getUserUsage: ReturnType<typeof createUsersEndpoints>['getUserUsage'];

  // Organization endpoints
  getOrgs: ReturnType<typeof createOrgsEndpoints>['getOrgs'];
  createOrg: ReturnType<typeof createOrgsEndpoints>['createOrg'];
  joinOrg: ReturnType<typeof createOrgsEndpoints>['joinOrg'];
  getOrg: ReturnType<typeof createOrgsEndpoints>['getOrg'];
  updateOrg: ReturnType<typeof createOrgsEndpoints>['updateOrg'];
  deleteOrg: ReturnType<typeof createOrgsEndpoints>['deleteOrg'];
  getOrgUsers: ReturnType<typeof createOrgsEndpoints>['getOrgUsers'];
  addOrgUser: ReturnType<typeof createOrgsEndpoints>['addOrgUser'];
  updateOrgUser: ReturnType<typeof createOrgsEndpoints>['updateOrgUser'];
  removeOrgUser: ReturnType<typeof createOrgsEndpoints>['removeOrgUser'];
  getOrgWebsites: ReturnType<typeof createOrgsEndpoints>['getOrgWebsites'];
  addOrgWebsite: ReturnType<typeof createOrgsEndpoints>['addOrgWebsite'];
  removeOrgWebsite: ReturnType<typeof createOrgsEndpoints>['removeOrgWebsite'];

  // Website endpoints
  getWebsites: ReturnType<typeof createWebsitesEndpoints>['getWebsites'];
  createWebsite: ReturnType<typeof createWebsitesEndpoints>['createWebsite'];
  getWebsite: ReturnType<typeof createWebsitesEndpoints>['getWebsite'];
  updateWebsite: ReturnType<typeof createWebsitesEndpoints>['updateWebsite'];
  deleteWebsite: ReturnType<typeof createWebsitesEndpoints>['deleteWebsite'];
  resetWebsite: ReturnType<typeof createWebsitesEndpoints>['resetWebsite'];
  transferWebsite: ReturnType<typeof createWebsitesEndpoints>['transferWebsite'];
  getWebsiteStats: ReturnType<typeof createWebsitesEndpoints>['getWebsiteStats'];
  getWebsitePageviews: ReturnType<typeof createWebsitesEndpoints>['getWebsitePageviews'];
  getWebsiteMetrics: ReturnType<typeof createWebsitesEndpoints>['getWebsiteMetrics'];
  getWebsiteExpandedMetrics: ReturnType<
    typeof createWebsitesEndpoints
  >['getWebsiteExpandedMetrics'];
  getWebsiteEvents: ReturnType<typeof createWebsitesEndpoints>['getWebsiteEvents'];
  getWebsiteEventsSeries: ReturnType<typeof createWebsitesEndpoints>['getWebsiteEventsSeries'];
  getWebsiteActive: ReturnType<typeof createWebsitesEndpoints>['getWebsiteActive'];
  getWebsiteDateRange: ReturnType<typeof createWebsitesEndpoints>['getWebsiteDateRange'];
  getWebsiteValues: ReturnType<typeof createWebsitesEndpoints>['getWebsiteValues'];
  getRealtimeData: ReturnType<typeof createWebsitesEndpoints>['getRealtimeData'];
  exportWebsiteData: ReturnType<typeof createWebsitesEndpoints>['exportWebsiteData'];

  // Phase 2: Web Vitals endpoints (NG only)
  getWebsiteVitals: ReturnType<typeof createWebsitesEndpoints>['getWebsiteVitals'];
  getWebsiteVitalEvents: ReturnType<typeof createWebsitesEndpoints>['getWebsiteVitalEvents'];
  trackVital: ReturnType<typeof createWebsitesEndpoints>['trackVital'];
  trackVitalsBatch: ReturnType<typeof createWebsitesEndpoints>['trackVitalsBatch'];

  // Phase 2: Form Analytics endpoints (NG only)
  getWebsiteForms: ReturnType<typeof createWebsitesEndpoints>['getWebsiteForms'];
  getFormFields: ReturnType<typeof createWebsitesEndpoints>['getFormFields'];
  getFormEvents: ReturnType<typeof createWebsitesEndpoints>['getFormEvents'];
  trackFormEvent: ReturnType<typeof createWebsitesEndpoints>['trackFormEvent'];
  trackFormEventsBatch: ReturnType<typeof createWebsitesEndpoints>['trackFormEventsBatch'];

  // Phase 2: Deployment endpoints (NG only)
  getWebsiteDeployments: ReturnType<typeof createWebsitesEndpoints>['getWebsiteDeployments'];
  getDeployment: ReturnType<typeof createWebsitesEndpoints>['getDeployment'];
  compareDeployments: ReturnType<typeof createWebsitesEndpoints>['compareDeployments'];
  setDeployment: ReturnType<typeof createWebsitesEndpoints>['setDeployment'];

  // Session endpoints
  getWebsiteSessions: ReturnType<typeof createSessionsEndpoints>['getWebsiteSessions'];
  getWebsiteSessionStats: ReturnType<typeof createSessionsEndpoints>['getWebsiteSessionStats'];
  getWeeklyTraffic: ReturnType<typeof createSessionsEndpoints>['getWeeklyTraffic'];
  getSession: ReturnType<typeof createSessionsEndpoints>['getSession'];
  getSessionActivity: ReturnType<typeof createSessionsEndpoints>['getSessionActivity'];
  getSessionProperties: ReturnType<typeof createSessionsEndpoints>['getSessionProperties'];

  // Event data endpoints
  getEventDataStats: ReturnType<typeof createEventsEndpoints>['getEventDataStats'];
  getEventDataEvents: ReturnType<typeof createEventsEndpoints>['getEventDataEvents'];
  getEventDataFields: ReturnType<typeof createEventsEndpoints>['getEventDataFields'];
  getEventDataValues: ReturnType<typeof createEventsEndpoints>['getEventDataValues'];
  getEventDataProperties: ReturnType<typeof createEventsEndpoints>['getEventDataProperties'];
  getEventData: ReturnType<typeof createEventsEndpoints>['getEventData'];
  getSessionDataProperties: ReturnType<typeof createEventsEndpoints>['getSessionDataProperties'];
  getSessionDataValues: ReturnType<typeof createEventsEndpoints>['getSessionDataValues'];
  sendTestEvent: ReturnType<typeof createEventsEndpoints>['sendTestEvent'];

  // Report endpoints
  getReports: ReturnType<typeof createReportsEndpoints>['getReports'];
  createReport: ReturnType<typeof createReportsEndpoints>['createReport'];
  getReport: ReturnType<typeof createReportsEndpoints>['getReport'];
  updateReport: ReturnType<typeof createReportsEndpoints>['updateReport'];
  deleteReport: ReturnType<typeof createReportsEndpoints>['deleteReport'];
  runFunnelReport: ReturnType<typeof createReportsEndpoints>['runFunnelReport'];
  runRetentionReport: ReturnType<typeof createReportsEndpoints>['runRetentionReport'];
  runJourneyReport: ReturnType<typeof createReportsEndpoints>['runJourneyReport'];
  runGoalReport: ReturnType<typeof createReportsEndpoints>['runGoalReport'];
  runAttributionReport: ReturnType<typeof createReportsEndpoints>['runAttributionReport'];
  runRevenueReport: ReturnType<typeof createReportsEndpoints>['runRevenueReport'];
  runUTMReport: ReturnType<typeof createReportsEndpoints>['runUTMReport'];
  runBreakdownReport: ReturnType<typeof createReportsEndpoints>['runBreakdownReport'];

  // Segment endpoints
  getSegments: ReturnType<typeof createSegmentsEndpoints>['getSegments'];
  createSegment: ReturnType<typeof createSegmentsEndpoints>['createSegment'];
  getSegment: ReturnType<typeof createSegmentsEndpoints>['getSegment'];
  updateSegment: ReturnType<typeof createSegmentsEndpoints>['updateSegment'];
  deleteSegment: ReturnType<typeof createSegmentsEndpoints>['deleteSegment'];

  // Link endpoints
  getLinks: ReturnType<typeof createLinksEndpoints>['getLinks'];
  getOrgLinks: ReturnType<typeof createLinksEndpoints>['getOrgLinks'];
  createLink: ReturnType<typeof createLinksEndpoints>['createLink'];
  getLink: ReturnType<typeof createLinksEndpoints>['getLink'];
  updateLink: ReturnType<typeof createLinksEndpoints>['updateLink'];
  deleteLink: ReturnType<typeof createLinksEndpoints>['deleteLink'];
  getLinkStats: ReturnType<typeof createLinksEndpoints>['getLinkStats'];

  // Pixel endpoints
  getPixels: ReturnType<typeof createPixelsEndpoints>['getPixels'];
  getOrgPixels: ReturnType<typeof createPixelsEndpoints>['getOrgPixels'];
  createPixel: ReturnType<typeof createPixelsEndpoints>['createPixel'];
  getPixel: ReturnType<typeof createPixelsEndpoints>['getPixel'];
  updatePixel: ReturnType<typeof createPixelsEndpoints>['updatePixel'];
  deletePixel: ReturnType<typeof createPixelsEndpoints>['deletePixel'];

  // Board endpoints (Custom Dashboards)
  getBoards: ReturnType<typeof createBoardsEndpoints>['getBoards'];
  getBoard: ReturnType<typeof createBoardsEndpoints>['getBoard'];
  createBoard: ReturnType<typeof createBoardsEndpoints>['createBoard'];
  updateBoard: ReturnType<typeof createBoardsEndpoints>['updateBoard'];
  deleteBoard: ReturnType<typeof createBoardsEndpoints>['deleteBoard'];
  getBoardWidgets: ReturnType<typeof createBoardsEndpoints>['getBoardWidgets'];
  getBoardWidget: ReturnType<typeof createBoardsEndpoints>['getBoardWidget'];
  createBoardWidget: ReturnType<typeof createBoardsEndpoints>['createBoardWidget'];
  updateBoardWidget: ReturnType<typeof createBoardsEndpoints>['updateBoardWidget'];
  deleteBoardWidget: ReturnType<typeof createBoardsEndpoints>['deleteBoardWidget'];

  // Config endpoints
  getConfig: ReturnType<typeof createConfigEndpoints>['get'];

  // Admin endpoints (admin only)
  admin: ReturnType<typeof createAdminEndpoints>;

  // Webhook endpoints
  webhooks: ReturnType<typeof createWebhooksEndpoints>;

  // Integration endpoints
  integrations: ReturnType<typeof createIntegrationsEndpoints>;

  // Billing endpoints
  billing: ReturnType<typeof createBillingEndpoints>;
}

/**
 * Create an Entrolytics API client.
 *
 * @example
 * ```ts
 * // Using environment variables
 * const client = getClient();
 *
 * // With explicit configuration
 * const client = getClient({
 *   endpoint: 'https://analytics.example.com/api',
 *   apiKey: 'your-api-key',
 * });
 *
 * // Make API calls
 * const { ok, data, error } = await client.getWebsites();
 * ```
 */
export function getClient(config?: ClientConfig): EntrolyticsClient {
  const apiClient = new ApiClient(config);

  const admin = createAdminEndpoints(apiClient);
  const auth = createAuthEndpoints(apiClient);
  const billing = createBillingEndpoints(apiClient);
  const config_endpoints = createConfigEndpoints(apiClient);
  const me = createMeEndpoints(apiClient);
  const users = createUsersEndpoints(apiClient);
  const orgs = createOrgsEndpoints(apiClient);
  const websites = createWebsitesEndpoints(apiClient);
  const sessions = createSessionsEndpoints(apiClient);
  const events = createEventsEndpoints(apiClient);
  const reports = createReportsEndpoints(apiClient);
  const segments = createSegmentsEndpoints(apiClient);
  const links = createLinksEndpoints(apiClient);
  const pixels = createPixelsEndpoints(apiClient);
  const boards = createBoardsEndpoints(apiClient);
  const webhooks = createWebhooksEndpoints(apiClient);
  const integrations = createIntegrationsEndpoints(apiClient);

  return {
    // Auth
    auth,
    // Me
    ...me,
    // Users
    ...users,
    // Organizations
    ...orgs,
    // Websites
    ...websites,
    // Sessions
    ...sessions,
    // Events
    ...events,
    // Reports
    ...reports,
    // Segments
    ...segments,
    // Links
    ...links,
    // Pixels
    ...pixels,
    // Boards
    ...boards,
    // Config
    getConfig: config_endpoints.get,
    // Admin
    admin,
    // Webhooks
    webhooks,
    // Integrations
    integrations,
    // Billing
    billing,
  };
}

// Also export individual endpoint creators for advanced usage
export {
  createAdminEndpoints,
  createAuthEndpoints,
  createBillingEndpoints,
  createBoardsEndpoints,
  createConfigEndpoints,
  createEventsEndpoints,
  createIntegrationsEndpoints,
  createLinksEndpoints,
  createMeEndpoints,
  createOrgsEndpoints,
  createPixelsEndpoints,
  createReportsEndpoints,
  createSegmentsEndpoints,
  createSessionsEndpoints,
  createUsersEndpoints,
  createWebhooksEndpoints,
  createWebsitesEndpoints,
};

// Export the base client for custom implementations
export { ApiClient };

// Export runtime detection utilities
export {
  detectRuntime,
  isNodeRuntime,
  isEdgeRuntime,
  getRuntimeCapabilities,
  assertRuntime,
  type Runtime,
} from './runtime';

// Export edge helpers
export {
  getEdgeEnv,
  requireEdgeEnv,
  createEdgeFetch,
  getRegionInfo,
  getGeoFromRequest,
  getClientIp,
  type EdgeFetchOptions,
  type RegionInfo,
} from './edge-helpers';

// Default export for convenience
export default getClient;
