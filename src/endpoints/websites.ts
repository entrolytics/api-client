import { API_ROUTES } from "@entrolytics/shared";
import type { ApiClient } from "../client";
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
} from "../types";

export function createWebsitesEndpoints(client: ApiClient) {
  const toDateRangeQuery = (params: DateRangeParams): { startDate: string; endDate: string } => ({
    startDate: new Date(params.startAt).toISOString(),
    endDate: new Date(params.endAt).toISOString(),
  });

  const toDeploymentDays = (params: DeploymentParams): number => {
    const diffMs = Math.max(params.endAt - params.startAt, 0);
    const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
    return Math.min(Math.max(days, 1), 365);
  };

  const toSuccessResponse = (
    response: ApiResponse<{ accepted?: boolean; count?: number }>,
  ): ApiResponse<{ success: boolean; count?: number }> => ({
    ...response,
    data: response.data
      ? {
          success: Boolean(response.data.accepted),
          ...(typeof response.data.count === "number" ? { count: response.data.count } : {}),
        }
      : undefined,
  });

  return {
    /**
     * Get all websites.
     */
    getWebsites(): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>("/websites");
    },

    /**
     * Create a new website.
     */
    createWebsite(data: CreateWebsiteData): Promise<ApiResponse<Website>> {
      return client.post<Website>("/websites", data);
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
      return client.patch<Website>(`/websites/${websiteId}`, data);
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
      return client.get<WebsiteStats>(`/websites/${websiteId}/stats`, toDateRangeQuery(params));
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
      params: DateRangeParams & { type: "csv" | "json" },
    ): Promise<ApiResponse<string>> {
      return client.get<string>(`/websites/${websiteId}/export`, params);
    },

    /**
     * Get website ingest mode configuration.
     */
    getWebsiteMode(websiteId: string): Promise<ApiResponse<import("../types").WebsiteModeConfig>> {
      return client.get<import("../types").WebsiteModeConfig>(`/websites/${websiteId}/mode`);
    },

    /**
     * Set website ingest mode (auto, node, or edge).
     */
    setWebsiteMode(
      websiteId: string,
      mode: import("../types").IngestMode,
    ): Promise<ApiResponse<{ message: string }>> {
      return client.post<{ message: string }>(`/websites/${websiteId}/mode`, { ingestMode: mode });
    },

    /**
     * Get routing health status.
     */
    getRoutingHealth(): Promise<ApiResponse<import("../types").RoutingHealth>> {
      return client.get<import("../types").RoutingHealth>("/health/routing");
    },

    /**
     * Get routing statistics.
     */
    getRoutingStats(params?: {
      start?: string;
      end?: string;
    }): Promise<ApiResponse<import("../types").RoutingStats>> {
      return client.get<import("../types").RoutingStats>("/routing/stats", params);
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
      return client.get<WebVitalsStats[]>(API_ROUTES.vitalsOverview, {
        websiteId,
        ...toDateRangeQuery(params),
      });
    },

    /**
     * Get individual Web Vital events.
     * Note: Only available in entrolytics.
     */
    getWebsiteVitalEvents(
      websiteId: string,
      params: WebVitalsParams & { limit?: number; offset?: number },
    ): Promise<ApiResponse<WebVital[]>> {
      return client.get<WebVital[]>(API_ROUTES.vitalsRecent, {
        websiteId,
        ...(params.limit ? { limit: params.limit } : {}),
      });
    },

    /**
     * Track a Web Vital metric (send to collection endpoint).
     * Note: Only available in entrolytics.
     */
    trackVital(
      websiteId: string,
      data: TrackVitalData,
    ): Promise<ApiResponse<{ success: boolean }>> {
      return client
        .post<{ accepted: boolean }>(API_ROUTES.collectVitals, {
          websiteId,
          visitorId: data.visitorId,
          sessionId: data.sessionId,
          url: data.url,
          path: data.path,
          metricName: data.metric,
          metricValue: data.value,
          deviceType: data.deviceType,
          browser: data.browser,
        })
        .then((response) => toSuccessResponse(response));
    },

    /**
     * Track multiple Web Vitals metrics in batch.
     * Note: Only available in entrolytics.
     */
    trackVitalsBatch(
      websiteId: string,
      vitals: TrackVitalData[],
    ): Promise<ApiResponse<{ success: boolean; count: number }>> {
      if (vitals.length === 0) {
        return Promise.resolve({
          ok: false,
          status: 400,
          error: "At least one vital is required",
        });
      }

      const [firstVital] = vitals;
      const inconsistentIdentity = vitals.some(
        (vital) =>
          vital.visitorId !== firstVital?.visitorId || vital.sessionId !== firstVital?.sessionId,
      );

      if (inconsistentIdentity) {
        return Promise.resolve({
          ok: false,
          status: 400,
          error: "All batched vitals must share the same visitorId and sessionId",
        });
      }

      return client
        .post<{ accepted: boolean; count: number }>(API_ROUTES.collectVitalsBatch, {
          websiteId,
          visitorId: firstVital?.visitorId,
          sessionId: firstVital?.sessionId,
          vitals: vitals.map((vital) => ({
            url: vital.url,
            path: vital.path,
            metricName: vital.metric,
            metricValue: vital.value,
            deviceType: vital.deviceType,
            browser: vital.browser,
          })),
        })
        .then(
          (response) =>
            toSuccessResponse(response) as ApiResponse<{ success: boolean; count: number }>,
        );
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
      return client.get<FormStats[]>(API_ROUTES.formsConversions, {
        websiteId,
        ...toDateRangeQuery(params),
      });
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
      return client.get<FormFieldStats[]>(API_ROUTES.formsFieldMetrics, {
        websiteId,
        formId,
        ...toDateRangeQuery(params),
      });
    },

    /**
     * Get individual form events.
     * Note: Only available in entrolytics.
     */
    getFormEvents(
      websiteId: string,
      params: FormAnalyticsParams & { limit?: number; offset?: number },
    ): Promise<ApiResponse<FormEvent[]>> {
      return client.get<FormEvent[]>(API_ROUTES.formsRecent, {
        websiteId,
        ...(params.limit ? { limit: params.limit } : {}),
      });
    },

    /**
     * Track a form event (send to collection endpoint).
     * Note: Only available in entrolytics.
     */
    trackFormEvent(
      websiteId: string,
      data: TrackFormEventData,
    ): Promise<ApiResponse<{ success: boolean }>> {
      return client
        .post<{ accepted: boolean }>(API_ROUTES.collectForms, {
          websiteId,
          visitorId: data.visitorId,
          sessionId: data.sessionId,
          formId: data.formId,
          formName: data.formName,
          urlPath: data.urlPath,
          eventType: data.eventType,
          fieldName: data.fieldName,
          fieldType: data.fieldType,
          fieldIndex: data.fieldIndex,
          timeOnField: data.timeOnField,
          timeSinceStart: data.timeSinceStart,
          errorMessage: data.errorMessage,
          success: data.success,
        })
        .then((response) => toSuccessResponse(response));
    },

    /**
     * Track multiple form events in batch.
     * Note: Only available in entrolytics.
     */
    trackFormEventsBatch(
      websiteId: string,
      events: TrackFormEventData[],
    ): Promise<ApiResponse<{ success: boolean; count: number }>> {
      if (events.length === 0) {
        return Promise.resolve({
          ok: false,
          status: 400,
          error: "At least one event is required",
        });
      }

      const [firstEvent] = events;
      const inconsistentIdentity = events.some(
        (event) =>
          event.visitorId !== firstEvent?.visitorId || event.sessionId !== firstEvent?.sessionId,
      );

      if (inconsistentIdentity) {
        return Promise.resolve({
          ok: false,
          status: 400,
          error: "All batched form events must share the same visitorId and sessionId",
        });
      }

      return client
        .post<{ accepted: boolean; count: number }>(API_ROUTES.collectFormsBatch, {
          websiteId,
          visitorId: firstEvent?.visitorId,
          sessionId: firstEvent?.sessionId,
          events: events.map((event) => ({
            formId: event.formId,
            formName: event.formName,
            urlPath: event.urlPath,
            eventType: event.eventType,
            fieldName: event.fieldName,
            fieldType: event.fieldType,
            fieldIndex: event.fieldIndex,
            timeOnField: event.timeOnField,
            timeSinceStart: event.timeSinceStart,
            errorMessage: event.errorMessage,
            success: event.success,
          })),
        })
        .then(
          (response) =>
            toSuccessResponse(response) as ApiResponse<{ success: boolean; count: number }>,
        );
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
      return client.get<Deployment[]>(API_ROUTES.deploymentByWebsite(websiteId), {
        limit: params.limit,
        days: toDeploymentDays(params),
      });
    },

    /**
     * Get a specific deployment.
     * Note: Only available in entrolytics.
     */
    getDeployment(websiteId: string, deployId: string): Promise<ApiResponse<Deployment>> {
      return client
        .get<Deployment[]>(API_ROUTES.deploymentByWebsite(websiteId), { limit: 100 })
        .then((response) => {
          if (!response.data) {
            return {
              ...response,
              data: undefined,
            } as ApiResponse<Deployment>;
          }

          const deployment = response.data.find((item) => item.deployId === deployId);
          if (!deployment) {
            return {
              ok: false,
              status: 404,
              error: `Deployment not found: ${deployId}`,
            };
          }

          return {
            ok: response.ok,
            status: response.status,
            data: deployment,
          };
        });
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
      return client
        .get<Deployment[]>(API_ROUTES.deploymentByWebsite(websiteId), { limit: 100 })
        .then((response) => {
          if (!response.data || response.data.length === 0) {
            return {
              ok: false,
              status: response.status || 404,
              error: "No deployments found",
            };
          }

          const current = response.data.find((item) => item.deployId === currentDeployId);
          const previous = previousDeployId
            ? response.data.find((item) => item.deployId === previousDeployId)
            : response.data.find((item) => item.deployId !== currentDeployId);

          if (!current) {
            return {
              ok: false,
              status: 404,
              error: `Deployment not found: ${currentDeployId}`,
            };
          }

          const diff = {
            sessions: current.totalSessions - (previous?.totalSessions ?? 0),
            pageviews: current.totalPageviews - (previous?.totalPageviews ?? 0),
            lcp:
              typeof current.avgLcp === "number"
                ? current.avgLcp - (previous?.avgLcp ?? 0)
                : undefined,
            inp:
              typeof current.avgInp === "number"
                ? current.avgInp - (previous?.avgInp ?? 0)
                : undefined,
            cls:
              typeof current.avgCls === "number"
                ? current.avgCls - (previous?.avgCls ?? 0)
                : undefined,
            ttfb:
              typeof current.avgTtfb === "number"
                ? current.avgTtfb - (previous?.avgTtfb ?? 0)
                : undefined,
            fcp:
              typeof current.avgFcp === "number"
                ? current.avgFcp - (previous?.avgFcp ?? 0)
                : undefined,
          };

          return {
            ok: response.ok,
            status: response.status,
            data: {
              current,
              previous,
              diff,
            },
          };
        });
    },

    /**
     * Set/register a deployment context.
     * Note: Only available in entrolytics.
     */
    setDeployment(websiteId: string, data: SetDeploymentData): Promise<ApiResponse<Deployment>> {
      return client.post<Deployment>(API_ROUTES.deployments, {
        websiteId,
        ...data,
        source: data.source ?? "custom",
      });
    },
  };
}
