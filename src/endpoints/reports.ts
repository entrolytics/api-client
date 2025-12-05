import type { ApiClient } from '../client';
import type {
  ApiResponse,
  CreateReportData,
  DateRangeParams,
  Report,
  UpdateReportData,
} from '../types';

// Report-specific result types
interface FunnelResult {
  step: number;
  name: string;
  visitors: number;
  dropoff: number;
  rate: number;
}

interface RetentionResult {
  date: string;
  visitors: number;
  returning: number[];
}

interface JourneyNode {
  id: string;
  name: string;
}

interface JourneyEdge {
  source: string;
  target: string;
  value: number;
}

interface JourneyResult {
  nodes: JourneyNode[];
  edges: JourneyEdge[];
}

interface GoalResult {
  goal: string;
  visitors: number;
  conversions: number;
  rate: number;
}

interface AttributionResult {
  channel: string;
  visitors: number;
  conversions: number;
  revenue: number;
}

interface RevenueResult {
  date: string;
  revenue: number;
  transactions: number;
  averageOrder: number;
}

interface UTMResult {
  source: string;
  medium: string;
  campaign: string;
  visitors: number;
  conversions: number;
}

interface BreakdownResult {
  field: string;
  value: string;
  visitors: number;
  pageviews: number;
}

export function createReportsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all reports for a website.
     */
    getReports(websiteId: string): Promise<ApiResponse<Report[]>> {
      return client.get<Report[]>(`/websites/${websiteId}/reports`);
    },

    /**
     * Create a new report.
     */
    createReport(data: CreateReportData): Promise<ApiResponse<Report>> {
      return client.post<Report>('/reports', data);
    },

    /**
     * Get a report by ID.
     */
    getReport(reportId: string): Promise<ApiResponse<Report>> {
      return client.get<Report>(`/reports/${reportId}`);
    },

    /**
     * Update a report.
     */
    updateReport(reportId: string, data: UpdateReportData): Promise<ApiResponse<Report>> {
      return client.post<Report>(`/reports/${reportId}`, data);
    },

    /**
     * Delete a report.
     */
    deleteReport(reportId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/reports/${reportId}`);
    },

    /**
     * Run a funnel report.
     */
    runFunnelReport(
      params: DateRangeParams & {
        websiteId: string;
        steps: { type: 'path' | 'event'; value: string }[];
        window?: number;
      },
    ): Promise<ApiResponse<FunnelResult[]>> {
      const { websiteId, steps, window = 30, startAt, endAt, ...rest } = params;
      return client.post<FunnelResult[]>('/reports/funnel', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          window,
          steps,
        },
        filters: rest,
      });
    },

    /**
     * Run a retention report.
     */
    runRetentionReport(
      params: DateRangeParams & {
        websiteId: string;
        timezone?: string;
      },
    ): Promise<ApiResponse<RetentionResult[]>> {
      const { websiteId, startAt, endAt, timezone, ...rest } = params;
      return client.post<RetentionResult[]>('/reports/retention', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          timezone,
        },
        filters: rest,
      });
    },

    /**
     * Run a journey/flow report.
     */
    runJourneyReport(
      params: DateRangeParams & {
        websiteId: string;
        steps?: number;
        startStep?: string;
        endStep?: string;
      },
    ): Promise<ApiResponse<JourneyResult>> {
      const { websiteId, startAt, endAt, steps = 5, startStep, endStep, ...rest } = params;
      return client.post<JourneyResult>('/reports/journey', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          steps,
          startStep,
          endStep,
        },
        filters: rest,
      });
    },

    /**
     * Run a goals report.
     */
    runGoalReport(
      params: DateRangeParams & {
        websiteId: string;
        type: string;
        value: string;
      },
    ): Promise<ApiResponse<GoalResult[]>> {
      const { websiteId, startAt, endAt, type, value, ...rest } = params;
      return client.post<GoalResult[]>('/reports/goal', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          type,
          value,
        },
        filters: rest,
      });
    },

    /**
     * Run an attribution report.
     */
    runAttributionReport(
      params: DateRangeParams & {
        websiteId: string;
        model: 'first-click' | 'last-click';
        type: 'path' | 'event';
        step: string;
        currency?: string;
      },
    ): Promise<ApiResponse<AttributionResult[]>> {
      const { websiteId, startAt, endAt, model, type, step, currency, ...rest } = params;
      return client.post<AttributionResult[]>('/reports/attribution', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          model,
          type,
          step,
          currency,
        },
        filters: rest,
      });
    },

    /**
     * Run a revenue report.
     */
    runRevenueReport(
      params: DateRangeParams & {
        websiteId: string;
        currency?: string;
      },
    ): Promise<ApiResponse<RevenueResult[]>> {
      const { websiteId, startAt, endAt, currency = 'USD', ...rest } = params;
      return client.post<RevenueResult[]>('/reports/revenue', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          currency,
        },
        filters: rest,
      });
    },

    /**
     * Run a UTM report.
     */
    runUTMReport(
      params: DateRangeParams & {
        websiteId: string;
      },
    ): Promise<ApiResponse<UTMResult[]>> {
      const { websiteId, startAt, endAt, ...rest } = params;
      return client.post<UTMResult[]>('/reports/utm', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
        },
        filters: rest,
      });
    },

    /**
     * Run a breakdown report.
     * @param property - Field to break down by (path, referrer, browser, device, os, country, etc.)
     */
    runBreakdownReport(
      params: DateRangeParams & {
        websiteId: string;
        property: string;
      },
    ): Promise<ApiResponse<BreakdownResult[]>> {
      const { websiteId, startAt, endAt, property, ...rest } = params;
      return client.post<BreakdownResult[]>('/reports/breakdown', {
        websiteId,
        parameters: {
          startDate: startAt,
          endDate: endAt,
          property,
        },
        filters: rest,
      });
    },
  };
}
