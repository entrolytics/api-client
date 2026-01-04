// ============================================================================
// Common Types
// ============================================================================

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

export interface DateRangeParams {
  startAt: number;
  endAt: number;
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// User Types
// ============================================================================

export type PlatformRole = 'admin' | 'user' | 'view-only';
export type OrganizationRole = 'admin' | 'manager' | 'member' | 'view-only';

export interface User {
  id: string;
  /** Clerk user ID (user_xxx format) */
  clerkId: string;
  /** Primary email address */
  email: string;
  /** Display name (computed from firstName + lastName or email) */
  displayName: string;
  /** First name from Clerk */
  firstName?: string | null;
  /** Last name from Clerk */
  lastName?: string | null;
  /** Profile image URL */
  imageUrl?: string | null;
  /** Platform-level role */
  role: PlatformRole;
  /** Whether user has admin privileges */
  isAdmin: boolean;
  /** Current organization ID (if in org context) */
  orgId?: string | null;
  /** Role within current organization */
  orgRole?: OrganizationRole | null;
  createdAt: string;
  updatedAt?: string | null;
  /** @deprecated Use clerkId instead */
  username?: string;
}

export interface CreateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: PlatformRole;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  role?: PlatformRole;
}

// ============================================================================
// Organization Types
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateOrgData {
  name: string;
}

export interface UpdateOrgData {
  name?: string;
}

export interface OrgUser {
  id: string;
  userId: string;
  orgId: string;
  role: OrganizationRole;
  user: User;
  createdAt: string;
}

export interface JoinOrgData {
  accessCode: string;
}

// ============================================================================
// Website Types
// ============================================================================

export interface Website {
  id: string;
  name: string;
  domain: string;
  shareId?: string;
  resetAt?: string;
  userId?: string;
  orgId?: string;
  createdAt: string;
  deletedAt?: string;
}

export interface CreateWebsiteData {
  name: string;
  domain: string;
  shareId?: string;
  orgId?: string;
}

export interface UpdateWebsiteData {
  name?: string;
  domain?: string;
  shareId?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface WebsiteStats {
  pageviews: { value: number; change: number };
  visitors: { value: number; change: number };
  visits: { value: number; change: number };
  bounces: { value: number; change: number };
  totalTime: { value: number; change: number };
}

/**
 * Link statistics - alias to WebsiteStats as they share the same structure
 */
export type LinkStats = WebsiteStats;

/**
 * @deprecated Use WebsiteStats or LinkStats instead
 */
export type Stats = WebsiteStats;

export interface PageviewData {
  x: string;
  y: number;
}

export interface WebsitePageviews {
  pageviews: PageviewData[];
  sessions: PageviewData[];
}

export interface MetricData {
  x: string;
  y: number;
}

export type MetricType =
  | 'url'
  | 'title'
  | 'referrer'
  | 'browser'
  | 'os'
  | 'device'
  | 'country'
  | 'region'
  | 'city'
  | 'language'
  | 'event';

export interface WebsiteMetricsParams extends DateRangeParams {
  type: MetricType;
  url?: string;
  referrer?: string;
  title?: string;
  query?: string;
  event?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface WebsiteEvent {
  id: string;
  websiteId: string;
  sessionId: string;
  createdAt: string;
  urlPath: string;
  urlQuery?: string;
  referrerPath?: string;
  referrerQuery?: string;
  referrerDomain?: string;
  pageTitle?: string;
  eventType: number;
  eventName?: string;
}

export interface EventStats {
  events: number;
  fields: number;
}

export interface EventData {
  eventName: string;
  propertyName: string;
  dataType: number;
  total: number;
}

export interface EventDataField {
  fieldName: string;
  dataType: number;
  fieldValue?: string;
}

// ============================================================================
// Session Types
// ============================================================================

export interface Session {
  id: string;
  websiteId: string;
  hostname: string;
  browser: string;
  os: string;
  device: string;
  screen: string;
  language: string;
  country?: string;
  subdivision1?: string;
  subdivision2?: string;
  city?: string;
  createdAt: string;
  distinctId?: string;
}

export interface SessionStats {
  pageviews: number;
  visitors: number;
  visits: number;
  countries: number;
}

export interface SessionActivity {
  createdAt: string;
  urlPath: string;
  urlQuery?: string;
  referrerDomain?: string;
  referrerPath?: string;
  eventName?: string;
  eventType: number;
}

// ============================================================================
// Report Types
// ============================================================================

export interface Report {
  id: string;
  userId: string;
  websiteId: string;
  type: string;
  name: string;
  description?: string;
  parameters: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  websiteId: string;
  type: string;
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
}

export interface UpdateReportData {
  name?: string;
  description?: string;
  parameters?: Record<string, unknown>;
}

// ============================================================================
// Segment Types
// ============================================================================

export interface Segment {
  id: string;
  websiteId: string;
  name: string;
  data: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSegmentData {
  name: string;
  data: Record<string, unknown>;
}

export interface UpdateSegmentData {
  name?: string;
  data?: Record<string, unknown>;
}

// ============================================================================
// Link Types
// ============================================================================

export interface Link {
  id: string;
  orgId: string;
  name: string;
  url: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface CreateLinkData {
  name: string;
  url: string;
  shortUrl?: string;
}

export interface UpdateLinkData {
  name?: string;
  url?: string;
}

// ============================================================================
// Pixel Types
// ============================================================================

export interface Pixel {
  id: string;
  orgId: string;
  name: string;
  trackingId: string;
  impressions: number;
  createdAt: string;
}

export interface CreatePixelData {
  name: string;
}

export interface UpdatePixelData {
  name?: string;
}

// ============================================================================
// Realtime Types
// ============================================================================

export interface RealtimeData {
  pageviews: PageviewData[];
  sessions: PageviewData[];
  events: EventData[];
  timestamp: number;
}

export interface ActiveVisitor {
  x: string;
  y: number;
}

// ============================================================================
// Board Types (Custom Dashboards)
// ============================================================================

export interface Board {
  id: string;
  userId: string;
  orgId?: string;
  websiteId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardWidget {
  id: string;
  boardId: string;
  title: string;
  type: string;
  parameters: Record<string, unknown>;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardData {
  websiteId: string;
  name: string;
  description?: string;
}

export interface UpdateBoardData {
  name?: string;
  description?: string;
}

export interface CreateBoardWidgetData {
  title: string;
  type: string;
  parameters?: Record<string, unknown>;
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface UpdateBoardWidgetData {
  title?: string;
  type?: string;
  parameters?: Record<string, unknown>;
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

// ============================================================================
// Billing Types
// ============================================================================

export type PlanId = 'starter' | 'pro' | 'business' | 'enterprise';

export interface AccountUsage {
  /** Current billing period start date (ISO string) */
  periodStart: string;
  /** Current billing period end date (ISO string) */
  periodEnd: string;
  /** Number of pageviews recorded this period */
  pageviews: number;
  /** Number of custom events recorded this period */
  events: number;
  /** Number of websites currently active */
  websites: number;
  /** Number of team members (for org accounts) */
  teamMembers: number;
}

export interface AccountEntitlements {
  /** User's current plan */
  plan: PlanId;
  /** Maximum pageviews per month */
  maxPageviews: number;
  /** Maximum custom events per month */
  maxEvents: number;
  /** Maximum websites allowed */
  maxWebsites: number;
  /** Maximum team members allowed */
  maxTeamMembers: number;
  /** Data retention period in months */
  dataRetentionMonths: number;
  /** Feature flags */
  features: {
    customDomains: boolean;
    apiAccess: boolean;
    webhooks: boolean;
    advancedReports: boolean;
    exportData: boolean;
    whiteLabel: boolean;
    prioritySupport: boolean;
    sla: boolean;
  };
}

export interface Subscription {
  /** Subscription ID */
  id: string;
  /** Current plan */
  plan: PlanId;
  /** Subscription status */
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';
  /** Current billing period start */
  currentPeriodStart: string;
  /** Current billing period end */
  currentPeriodEnd: string;
  /** Whether subscription will cancel at period end */
  cancelAtPeriodEnd: boolean;
  /** Trial end date (if trialing) */
  trialEnd?: string;
}

export interface CheckoutOptions {
  /** Plan to checkout */
  plan: PlanId;
  /** Billing interval */
  interval?: 'month' | 'year';
  /** Success redirect URL */
  successUrl?: string;
  /** Cancel redirect URL */
  cancelUrl?: string;
}

export interface CheckoutResponse {
  /** Stripe checkout URL */
  url: string;
}

export interface PortalResponse {
  /** Stripe customer portal URL */
  url: string;
}

// ============================================================================
// Routing Types
// ============================================================================

/**
 * Website ingest mode configuration
 */
export type IngestMode = 'auto' | 'node' | 'edge';

export interface WebsiteModeConfig {
  ingestMode: IngestMode;
}

/**
 * Routing health status
 */
export interface RoutingHealth {
  status: 'ok' | 'degraded' | 'error';
  edge: {
    healthy: boolean;
    latency: number;
  };
  node: {
    healthy: boolean;
    latency: number;
  };
  timestamp: string;
}

/**
 * Routing statistics
 */
export interface RoutingStats {
  period: {
    start: string;
    end: string;
  };
  requests: {
    total: number;
    edge: number;
    node: number;
  };
  latency: {
    edge: {
      p50: number;
      p95: number;
      p99: number;
    };
    node: {
      p50: number;
      p95: number;
      p99: number;
    };
  };
}

// ============================================================================
// Phase 2: Web Vitals Types
// ============================================================================

export type VitalMetric = 'LCP' | 'INP' | 'CLS' | 'TTFB' | 'FCP';
export type VitalRating = 'good' | 'needs-improvement' | 'poor';
export type NavigationType = 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache' | 'prerender' | 'restore';

export interface WebVital {
  id: string;
  websiteId: string;
  sessionId?: string;
  createdAt: string;
  metricName: VitalMetric;
  metricValue: number;
  metricRating: VitalRating;
  urlPath: string;
  deviceType?: string;
  connectionType?: string;
  deployId?: string;
  navigationType?: NavigationType;
}

export interface WebVitalsStats {
  metric: VitalMetric;
  count: number;
  p50: number;
  p75: number;
  p95: number;
  good: number;
  needsImprovement: number;
  poor: number;
}

export interface WebVitalsParams extends DateRangeParams {
  metric?: VitalMetric;
  urlPath?: string;
  deployId?: string;
  deviceType?: string;
}

export interface TrackVitalData {
  metric: VitalMetric;
  value: number;
  rating: VitalRating;
  delta?: number;
  id?: string;
  navigationType?: NavigationType;
  attribution?: Record<string, unknown>;
  url?: string;
  path?: string;
  sessionId?: string;
}

// ============================================================================
// Phase 2: Form Analytics Types
// ============================================================================

export type FormEventType = 'start' | 'field_focus' | 'field_blur' | 'field_error' | 'submit' | 'abandon';

export interface FormEvent {
  id: string;
  websiteId: string;
  sessionId?: string;
  createdAt: string;
  formId: string;
  formName?: string;
  eventType: FormEventType;
  fieldName?: string;
  fieldType?: string;
  fieldIndex?: number;
  timeOnField?: number;
  timeSinceStart?: number;
  errorMessage?: string;
  success?: boolean;
  urlPath: string;
}

export interface FormStats {
  formId: string;
  formName?: string;
  starts: number;
  submissions: number;
  abandonments: number;
  conversionRate: number;
  avgTimeToComplete: number;
}

export interface FormFieldStats {
  fieldName: string;
  fieldType?: string;
  focusCount: number;
  blurCount: number;
  errorCount: number;
  avgTimeOnField: number;
  dropOffRate: number;
}

export interface FormAnalyticsParams extends DateRangeParams {
  formId?: string;
  urlPath?: string;
}

export interface TrackFormEventData {
  eventType: FormEventType;
  formId: string;
  formName?: string;
  urlPath: string;
  fieldName?: string;
  fieldType?: string;
  fieldIndex?: number;
  timeOnField?: number;
  timeSinceStart?: number;
  errorMessage?: string;
  success?: boolean;
  sessionId?: string;
}

// ============================================================================
// Phase 2: Deployment Types
// ============================================================================

export interface Deployment {
  id: string;
  websiteId: string;
  deployId: string;
  gitSha?: string;
  gitBranch?: string;
  deployUrl?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  totalSessions: number;
  totalPageviews: number;
  avgLcp?: number;
  avgInp?: number;
  avgCls?: number;
  avgTtfb?: number;
  avgFcp?: number;
}

export interface DeploymentComparison {
  current: Deployment;
  previous?: Deployment;
  diff: {
    sessions: number;
    pageviews: number;
    lcp?: number;
    inp?: number;
    cls?: number;
    ttfb?: number;
    fcp?: number;
  };
}

export interface DeploymentParams extends DateRangeParams {
  deployId?: string;
  gitBranch?: string;
  limit?: number;
}

export interface SetDeploymentData {
  deployId: string;
  gitSha?: string;
  gitBranch?: string;
  deployUrl?: string;
  source?: 'vercel' | 'netlify' | 'cloudflare' | 'railway' | 'render' | 'fly' | 'heroku' | 'aws' | 'gcp' | 'azure' | 'custom';
}
