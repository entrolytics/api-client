import type { ApiClient } from '../client';
import type {
  ApiResponse,
  Board,
  BoardWidget,
  CreateBoardData,
  CreateBoardWidgetData,
  UpdateBoardData,
  UpdateBoardWidgetData,
} from '../types';

export function createBoardsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all boards for a website.
     */
    getBoards(websiteId: string): Promise<ApiResponse<Board[]>> {
      return client.get<Board[]>(`/websites/${websiteId}/boards`);
    },

    /**
     * Get a specific board by ID.
     */
    getBoard(boardId: string): Promise<ApiResponse<Board>> {
      return client.get<Board>(`/boards/${boardId}`);
    },

    /**
     * Create a new board.
     */
    createBoard(data: CreateBoardData): Promise<ApiResponse<Board>> {
      return client.post<Board>('/boards', data);
    },

    /**
     * Update a board.
     */
    updateBoard(boardId: string, data: UpdateBoardData): Promise<ApiResponse<Board>> {
      return client.post<Board>(`/boards/${boardId}`, data);
    },

    /**
     * Delete a board.
     */
    deleteBoard(boardId: string): Promise<ApiResponse<{ ok: boolean }>> {
      return client.delete<{ ok: boolean }>(`/boards/${boardId}`);
    },

    /**
     * Get all widgets for a board.
     */
    getBoardWidgets(boardId: string): Promise<ApiResponse<BoardWidget[]>> {
      return client.get<BoardWidget[]>(`/boards/${boardId}/widgets`);
    },

    /**
     * Get a specific widget by ID.
     */
    getBoardWidget(boardId: string, widgetId: string): Promise<ApiResponse<BoardWidget>> {
      return client.get<BoardWidget>(`/boards/${boardId}/widgets/${widgetId}`);
    },

    /**
     * Create a new widget on a board.
     */
    createBoardWidget(
      boardId: string,
      data: CreateBoardWidgetData,
    ): Promise<ApiResponse<BoardWidget>> {
      return client.post<BoardWidget>(`/boards/${boardId}/widgets`, data);
    },

    /**
     * Update a widget.
     */
    updateBoardWidget(
      boardId: string,
      widgetId: string,
      data: UpdateBoardWidgetData,
    ): Promise<ApiResponse<BoardWidget>> {
      return client.post<BoardWidget>(`/boards/${boardId}/widgets/${widgetId}`, data);
    },

    /**
     * Delete a widget.
     */
    deleteBoardWidget(boardId: string, widgetId: string): Promise<ApiResponse<{ ok: boolean }>> {
      return client.delete<{ ok: boolean }>(`/boards/${boardId}/widgets/${widgetId}`);
    },
  };
}
