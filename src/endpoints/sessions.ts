import type { ApiClient } from '../client';
import type {
  ApiResponse,
  DateRangeParams,
  Session,
  SessionActivity,
  SessionStats,
} from '../types';

export function createSessionsEndpoints(client: ApiClient) {
  return {
    /**
     * Get website sessions.
     */
    getWebsiteSessions(
      websiteId: string,
      params: DateRangeParams & { query?: string; limit?: number; offset?: number },
    ): Promise<ApiResponse<Session[]>> {
      return client.get<Session[]>(`/websites/${websiteId}/sessions`, params);
    },

    /**
     * Get session statistics.
     */
    getWebsiteSessionStats(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<SessionStats>> {
      return client.get<SessionStats>(`/websites/${websiteId}/sessions/stats`, params);
    },

    /**
     * Get weekly session traffic.
     */
    getWeeklyTraffic(
      websiteId: string,
      params: DateRangeParams & { timezone?: string },
    ): Promise<ApiResponse<{ day: number; hour: number; y: number }[]>> {
      return client.get(`/websites/${websiteId}/sessions/weekly`, params);
    },

    /**
     * Get a specific session.
     */
    getSession(websiteId: string, sessionId: string): Promise<ApiResponse<Session>> {
      return client.get<Session>(`/websites/${websiteId}/sessions/${sessionId}`);
    },

    /**
     * Get session activity (pageviews and events).
     */
    getSessionActivity(
      websiteId: string,
      sessionId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<SessionActivity[]>> {
      return client.get<SessionActivity[]>(
        `/websites/${websiteId}/sessions/${sessionId}/activity`,
        params,
      );
    },

    /**
     * Get session properties (custom data).
     */
    getSessionProperties(
      websiteId: string,
      sessionId: string,
    ): Promise<ApiResponse<Record<string, string | number | boolean>[]>> {
      return client.get(`/websites/${websiteId}/sessions/${sessionId}/properties`);
    },
  };
}
