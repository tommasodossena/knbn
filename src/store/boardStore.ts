import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DropResult } from "@hello-pangea/dnd";

interface Card {
  id: string;
  value: string;
  createdAt: string;
}

interface Column {
  id: string;
  value: string;
  cards: Card[];
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

interface BoardStore {
  boards: Board[];
  addBoard: (name: string, initialBoard?: Partial<Board>) => void;
  removeBoard: (id: string) => void;
  getBoardById: (id: string) => Board | undefined;
  addColumn: (boardId: string, value: string) => void;
  removeColumn: (boardId: string, id: string) => void;
  updateColumn: (boardId: string, columnId: string, newTitle: string) => void;
  moveColumn: (boardId: string, result: DropResult) => void;
  addCard: (boardId: string, columnId: string, value: string) => void;
  removeCard: (boardId: string, columnId: string, cardId: string) => void;
  updateCard: (
    boardId: string,
    columnId: string,
    cardId: string,
    value: string,
  ) => void;
  moveCard: (boardId: string, result: DropResult) => void;
}

const useBoardStore = create(
  persist<BoardStore>(
    (set, get) => ({
      boards: [],
      addBoard: (name, initialBoard?: Partial<Board>) => {
        set((state) => ({
          boards: [
            ...state.boards,
            {
              id: Date.now().toString(),
              name,
              columns: initialBoard?.columns || [],
              ...initialBoard,
            },
          ],
        }));
      },
      removeBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        }));
      },
      getBoardById: (id) => {
        return get().boards.find((board) => board.id === id);
      },
      addColumn: (boardId, value) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          const newColumn = { id: Date.now().toString(), value, cards: [] };
          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? { ...board, columns: [...board.columns, newColumn] }
                : board,
            ),
          };
        });
      },
      removeColumn: (boardId, id) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.filter((column) => column.id !== id),
                  }
                : board,
            ),
          };
        });
      },
      updateColumn: (boardId, columnId, newTitle) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map((column) =>
                      column.id === columnId
                        ? { ...column, value: newTitle }
                        : column,
                    ),
                  }
                : board,
            ),
          };
        });
      },
      moveColumn: (boardId, result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          const newColumns = [...board.columns];
          const [movedColumn] = newColumns.splice(source.index, 1);
          newColumns.splice(destination.index, 0, movedColumn);

          return {
            boards: state.boards.map((board) =>
              board.id === boardId ? { ...board, columns: newColumns } : board,
            ),
          };
        });
      },
      addCard: (boardId, columnId, value) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map((column) =>
                      column.id === columnId
                        ? {
                            ...column,
                            cards: [
                              ...(Array.isArray(column.cards)
                                ? column.cards
                                : []),
                              {
                                id: Date.now().toString(),
                                value,
                                createdAt: new Date().toISOString(),
                              },
                            ],
                          }
                        : column,
                    ),
                  }
                : board,
            ),
          };
        });
      },
      removeCard: (boardId, columnId, cardId) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map((column) =>
                      column.id === columnId
                        ? {
                            ...column,
                            cards: column.cards.filter(
                              (card) => card.id !== cardId,
                            ),
                          }
                        : column,
                    ),
                  }
                : board,
            ),
          };
        });
      },
      updateCard: (boardId, columnId, cardId, value) => {
        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map((column) =>
                      column.id === columnId
                        ? {
                            ...column,
                            cards: column.cards.map((card) =>
                              card.id === cardId ? { ...card, value } : card,
                            ),
                          }
                        : column,
                    ),
                  }
                : board,
            ),
          };
        });
      },
      moveCard: (boardId, result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        set((state) => {
          const board = state.boards.find((board) => board.id === boardId);
          if (!board) return state;

          const newColumns = [...board.columns];
          const sourceColumn = newColumns.find(
            (col) => col.id === source.droppableId,
          );
          const destColumn = newColumns.find(
            (col) => col.id === destination.droppableId,
          );

          if (sourceColumn && destColumn) {
            const [movedCard] = sourceColumn.cards.splice(source.index, 1);
            destColumn.cards.splice(destination.index, 0, movedCard);
          }

          return {
            boards: state.boards.map((board) =>
              board.id === boardId ? { ...board, columns: newColumns } : board,
            ),
          };
        });
      },
    }),
    {
      name: "board-store",
    },
  ),
);

export default useBoardStore;
