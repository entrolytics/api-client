import type { ApiClient } from '../client';
import type { ApiResponse, CreatePixelData, Pixel, UpdatePixelData } from '../types';

export function createPixelsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all pixels.
     */
    getPixels(): Promise<ApiResponse<Pixel[]>> {
      return client.get<Pixel[]>('/pixels');
    },

    /**
     * Get pixels for an organization.
     */
    getOrgPixels(orgId: string): Promise<ApiResponse<Pixel[]>> {
      return client.get<Pixel[]>(`/orgs/${orgId}/pixels`);
    },

    /**
     * Create a new pixel.
     */
    createPixel(orgId: string, data: CreatePixelData): Promise<ApiResponse<Pixel>> {
      return client.post<Pixel>(`/orgs/${orgId}/pixels`, data);
    },

    /**
     * Get a pixel by ID.
     */
    getPixel(pixelId: string): Promise<ApiResponse<Pixel>> {
      return client.get<Pixel>(`/pixels/${pixelId}`);
    },

    /**
     * Update a pixel.
     */
    updatePixel(pixelId: string, data: UpdatePixelData): Promise<ApiResponse<Pixel>> {
      return client.post<Pixel>(`/pixels/${pixelId}`, data);
    },

    /**
     * Delete a pixel.
     */
    deletePixel(pixelId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/pixels/${pixelId}`);
    },
  };
}
