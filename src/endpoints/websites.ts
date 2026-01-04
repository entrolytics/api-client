import type { ApiClient } from '../client';
import type {
  ActiveVisitor,
  ApiResponse,
  CreateWebsiteData,
  DateRangeParams,
  Deployment,
  DeploymentComparison,
  DeploymentParams,
  FormAnalyticsParams,
  FormEvent,
  FormFieldStats,
  FormStats,
  MetricData,
  RealtimeData,
  SetDeploymentData,
  TrackFormEventData,
  TrackVitalData,
  UpdateWebsiteData,
  Website,
  WebsiteEvent,
  WebsiteMetricsParams,
  WebsitePageviews,
  WebsiteStats,
  WebVital,
  WebVitalsParams,
  WebVitalsStats,
} from '../types';

export function createWebsitesEndpoints(client: ApiClient) {
  return {
    /**
     * Get all websites.
     */
    getWebsites(): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>('/websites');
    },

    /**
     * Create a new website.
     */
    createWebsite(data: CreateWebsiteData): Promise<ApiResponse<Website>> {
      return client.post<Website>('/websites', data);
    },

    /**
     * Get a website by ID.
     */
    getWebsite(websiteId: string): Promise<ApiResponse<Website>> {
      return client.get<Website>(`/websites/${websiteId}`);
    },

    /**
     * Update a website.
     */
    updateWebsite(websiteId: string, data: UpdateWebsiteData): Promise<ApiResponse<Website>> {
      return client.post<Website>(`/websites/${websiteId}`, data);
    },

    /**
     * Delete a website.
     */
    deleteWebsite(websiteId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/websites/${websiteId}`);
    },

    /**
     * Reset a website's data.
     */
    resetWebsite(websiteId: string): Promise<ApiResponse<void>> {
      return client.post<void>(`/websites/${websiteId}/reset`);
    },

    /**
     * Transfer website ownership.
     */
    transferWebsite(
      websiteId: string,
      data: { userId?: string; orgId?: string },
    ): Promise<ApiResponse<Website>> {
      return client.post<Website>(`/websites/${websiteId}/transfer`, data);
    },

    /**
     * Get website statistics.
     */
    getWebsiteStats(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<WebsiteStats>> {
      return client.get<WebsiteStats>(`/websites/${websiteId}/stats`, params);
    },

    /**
     * Get website pageviews data.
     */
    getWebsitePageviews(
      websiteId: string,
      params: DateRangeParams & { unit?: string; timezone?: string },
    ): Promise<ApiResponse<WebsitePageviews>> {
      return client.get<WebsitePageviews>(`/websites/${websiteId}/pageviews`, params);
    },

    /**
     * Get website metrics (URLs, referrers, browsers, etc.).
     */
    getWebsiteMetrics(
      websiteId: string,
      params: WebsiteMetricsParams,
    ): Promise<ApiResponse<MetricData[]>> {
      return client.get<MetricData[]>(`/websites/${websiteId}/metrics`, params);
    },

    /**
     * Get expanded metrics (with additional details).
     */
    getWebsiteExpandedMetrics(
      websiteId: string,
      params: WebsiteMetricsParams,
    ): Promise<ApiResponse<MetricData[]>> {
      return client.get<MetricData[]>(`/websites/${websiteId}/metrics/expanded`, params);
    },

    /**
     * Get website events.
     */
    getWebsiteEvents(
      websiteId: string,
      params: DateRangeParams & { query?: string; limit?: number; offset?: number },
    ): Promise<ApiResponse<WebsiteEvent[]>> {
      return client.get<WebsiteEvent[]>(`/websites/${websiteId}/events`, params);
    },

    /**
     * Get events time series.
     */
    getWebsiteEventsSeries(
      websiteId: string,
      params: DateRangeParams & { unit?: string; timezone?: string; event?: string },
    ): Promise<ApiResponse<{ x: string; y: number }[]>> {
      return client.get(`/websites/${websiteId}/events/series`, params);
    },

    /**
     * Get active visitors count.
     */
    getWebsiteActive(websiteId: string): Promise<ApiResponse<ActiveVisitor[]>> {
      return client.get<ActiveVisitor[]>(`/websites/${websiteId}/active`);
    },

    /**
     * Get website date range (first and last event dates).
     */
    getWebsiteDateRange(
      websiteId: string,
    ): Promise<ApiResponse<{ minDate: string; maxDate: string }>> {
      return client.get(`/websites/${websiteId}/daterange`);
    },

    /**
     * Get website values for a specific field.
     */
    getWebsiteValues(
      websiteId: string,
      params: DateRangeParams & { type: string },
    ): Promise<ApiResponse<string[]>> {
      return client.get<string[]>(`/websites/${websiteId}/values`, params);
    },

    /**
     * Get realtime data.
     */
    getRealtimeData(websiteId: string): Promise<ApiResponse<RealtimeData>> {
      return client.get<RealtimeData>(`/realtime/${websiteId}`);
    },

    /**
     * Export website data.
     */
    exportWebsiteData(
      websiteId: string,
      params: DateRangeParams & { type: 'csv' | 'json' },
    ): Promise<ApiResponse<string>> {
      return client.get<string>(`/websites/${websiteId}/export`, params);
    },

    /**
     * Get website ingest mode configuration.
     */
    getWebsiteMode(websiteId: string): Promise<ApiResponse<import('../types').WebsiteModeConfig>> {
      return client.get<import('../types').WebsiteModeConfig>(`/websites/${websiteId}/mode`);
    },

    /**
     * Set website ingest mode (auto, node, or edge).
     */
    setWebsiteMode(
      websiteId: string,
      mode: import('../types').IngestMode
    ): Promise<ApiResponse<{ message: string }>> {
      return client.post<{ message: string }>(`/websites/${websiteId}/mode`, { ingestMode: mode });
    },

    /**
     * Get routing health status.
     */
    getRoutingHealth(): Promise<ApiResponse<import('../types').RoutingHealth>> {
      return client.get<import('../types').RoutingHealth>('/health/routing');
    },

    /**
     * Get routing statistics.
     */
    getRoutingStats(params?: {
      start?: string;
      end?: string;
    }): Promise<ApiResponse<import('../types').RoutingStats>> {
      return client.get<import('../types').RoutingStats>('/routing/stats', params);
    },

    // ========================================================================
    // Phase 2: Web Vitals Endpoints (NG only)
    // ========================================================================

    /**
     * Get Web Vitals statistics for a website.
     * Note: Only available in entrolytics.
     */
    getWebsiteVitals(
      websiteId: string,
      params: WebVitalsParams,
    ): Promise<ApiResponse<WebVitalsStats[]>> {
      return client.get<WebVitalsStats[]>(`/websites/${websiteId}/vitals`, params);
    },

    /**
     * Get individual Web Vital events.
     * Note: Only available in entrolytics.
     */
    getWebsiteVitalEvents(
      websiteId: string,
      params: WebVitalsParams & { limit?: number; offset?: number },
    ): Promise<ApiResponse<WebVital[]>> {
      return client.get<WebVital[]>(`/websites/${websiteId}/vitals/events`, params);
    },

    /**
     * Track a Web Vital metric (send to collection endpoint).
     * Note: Only available in entrolytics.
     */
    trackVital(websiteId: string, data: TrackVitalData): Promise<ApiResponse<{ success: boolean }>> {
      return client.post<{ success: boolean }>('/collect/vitals', {
        website: websiteId,
        ...data,
      });
    },

    /**
     * Track multiple Web Vitals metrics in batch.
     * Note: Only available in entrolytics.
     */
    trackVitalsBatch(
      websiteId: string,
      vitals: TrackVitalData[],
    ): Promise<ApiResponse<{ success: boolean; count: number }>> {
      return client.post<{ success: boolean; count: number }>('/collect/vitals', {
        website: websiteId,
        vitals,
      });
    },

    // ========================================================================
    // Phase 2: Form Analytics Endpoints (NG only)
    // ========================================================================

    /**
     * Get form analytics for a website.
     * Note: Only available in entrolytics.
     */
    getWebsiteForms(
      websiteId: string,
      params: FormAnalyticsParams,
    ): Promise<ApiResponse<FormStats[]>> {
      return client.get<FormStats[]>(`/websites/${websiteId}/forms`, params);
    },

    /**
     * Get field-level analytics for a specific form.
     * Note: Only available in entrolytics.
     */
    getFormFields(
      websiteId: string,
      formId: string,
      params: FormAnalyticsParams,
    ): Promise<ApiResponse<FormFieldStats[]>> {
      return client.get<FormFieldStats[]>(`/websites/${websiteId}/forms/${formId}/fields`, params);
    },

    /**
     * Get individual form events.
     * Note: Only available in entrolytics.
     */
    getFormEvents(
      websiteId: string,
      params: FormAnalyticsParams & { limit?: number; offset?: number },
    ): Promise<ApiResponse<FormEvent[]>> {
      return client.get<FormEvent[]>(`/websites/${websiteId}/forms/events`, params);
    },

    /**
     * Track a form event (send to collection endpoint).
     * Note: Only available in entrolytics.
     */
    trackFormEvent(
      websiteId: string,
      data: TrackFormEventData,
    ): Promise<ApiResponse<{ success: boolean }>> {
      return client.post<{ success: boolean }>('/collect/forms', {
        website: websiteId,
        ...data,
      });
    },

    /**
     * Track multiple form events in batch.
     * Note: Only available in entrolytics.
     */
    trackFormEventsBatch(
      websiteId: string,
      events: TrackFormEventData[],
    ): Promise<ApiResponse<{ success: boolean; count: number }>> {
      return client.post<{ success: boolean; count: number }>('/collect/forms', {
        website: websiteId,
        events,
      });
    },

    // ========================================================================
    // Phase 2: Deployment Tracking Endpoints (NG only)
    // ========================================================================

    /**
     * Get deployments for a website.
     * Note: Only available in entrolytics.
     */
    getWebsiteDeployments(
      websiteId: string,
      params: DeploymentParams,
    ): Promise<ApiResponse<Deployment[]>> {
      return client.get<Deployment[]>(`/websites/${websiteId}/deployments`, params);
    },

    /**
     * Get a specific deployment.
     * Note: Only available in entrolytics.
     */
    getDeployment(
      websiteId: string,
      deployId: string,
    ): Promise<ApiResponse<Deployment>> {
      return client.get<Deployment>(`/websites/${websiteId}/deployments/${deployId}`);
    },

    /**
     * Compare two deployments.
     * Note: Only available in entrolytics.
     */
    compareDeployments(
      websiteId: string,
      currentDeployId: string,
      previousDeployId?: string,
    ): Promise<ApiResponse<DeploymentComparison>> {
      return client.get<DeploymentComparison>(`/websites/${websiteId}/deployments/${currentDeployId}/compare`, {
        previous: previousDeployId,
      });
    },

    /**
     * Set/register a deployment context.
     * Note: Only available in entrolytics.
     */
    setDeployment(
      websiteId: string,
      data: SetDeploymentData,
    ): Promise<ApiResponse<Deployment>> {
      return client.post<Deployment>(`/websites/${websiteId}/deployments`, data);
    },
  };
}
