import type { ApiClient } from '../client';
import type { ApiResponse, CreateSegmentData, Segment, UpdateSegmentData } from '../types';

export function createSegmentsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all segments for a website.
     */
    getSegments(websiteId: string): Promise<ApiResponse<Segment[]>> {
      return client.get<Segment[]>(`/websites/${websiteId}/segments`);
    },

    /**
     * Create a new segment.
     */
    createSegment(websiteId: string, data: CreateSegmentData): Promise<ApiResponse<Segment>> {
      return client.post<Segment>(`/websites/${websiteId}/segments`, data);
    },

    /**
     * Get a segment by ID.
     */
    getSegment(websiteId: string, segmentId: string): Promise<ApiResponse<Segment>> {
      return client.get<Segment>(`/websites/${websiteId}/segments/${segmentId}`);
    },

    /**
     * Update a segment.
     */
    updateSegment(
      websiteId: string,
      segmentId: string,
      data: UpdateSegmentData,
    ): Promise<ApiResponse<Segment>> {
      return client.post<Segment>(`/websites/${websiteId}/segments/${segmentId}`, data);
    },

    /**
     * Delete a segment.
     */
    deleteSegment(websiteId: string, segmentId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/websites/${websiteId}/segments/${segmentId}`);
    },
  };
}
