import type { ApiClient } from "../client";
import type { ApiResponse, DateRangeParams, EventData, EventDataField, EventStats } from "../types";

function generateUuid(): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function createEventsEndpoints(client: ApiClient) {
  return {
    /**
     * Get event data statistics.
     */
    getEventDataStats(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<EventStats>> {
      return client.get<EventStats>(`/websites/${websiteId}/event-data/stats`, params);
    },

    /**
     * Get event data events (distinct event names).
     */
    getEventDataEvents(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<{ eventName: string; total: number }[]>> {
      return client.get(`/websites/${websiteId}/event-data/events`, params);
    },

    /**
     * Get event data fields for a specific event.
     */
    getEventDataFields(
      websiteId: string,
      params: DateRangeParams & { eventName: string },
    ): Promise<ApiResponse<EventDataField[]>> {
      return client.get<EventDataField[]>(`/websites/${websiteId}/event-data/fields`, params);
    },

    /**
     * Get event data values for a specific field.
     */
    getEventDataValues(
      websiteId: string,
      params: DateRangeParams & { eventName: string; fieldName: string },
    ): Promise<ApiResponse<{ fieldValue: string; total: number }[]>> {
      return client.get(`/websites/${websiteId}/event-data/values`, params);
    },

    /**
     * Get event data properties breakdown.
     */
    getEventDataProperties(
      websiteId: string,
      params: DateRangeParams & { eventName?: string },
    ): Promise<ApiResponse<EventData[]>> {
      return client.get<EventData[]>(`/websites/${websiteId}/event-data/properties`, params);
    },

    /**
     * Get specific event data by ID.
     */
    getEventData(
      websiteId: string,
      eventId: string,
    ): Promise<ApiResponse<Record<string, unknown>>> {
      return client.get(`/websites/${websiteId}/event-data/${eventId}`);
    },

    /**
     * Get session data properties.
     */
    getSessionDataProperties(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<{ propertyName: string; total: number }[]>> {
      return client.get(`/websites/${websiteId}/session-data/properties`, params);
    },

    getSessionDataValues(
      websiteId: string,
      params: DateRangeParams & { propertyName: string },
    ): Promise<ApiResponse<{ propertyValue: string; total: number }[]>> {
      return client.get(`/websites/${websiteId}/session-data/values`, params);
    },

    /**
     * Send a test event to verify setup.
     */
    sendTestEvent(websiteId: string): Promise<ApiResponse<void>> {
      return client.post<void>("/collect", {
        websiteId,
        sessionId: generateUuid(),
        visitorId: generateUuid(),
        url: "https://entrolytics.click/test-event",
        eventType: "custom_event",
        eventName: "cli_test_event",
        properties: {
          source: "entro-cli",
          timestamp: Date.now(),
        },
      });
    },
  };
}
