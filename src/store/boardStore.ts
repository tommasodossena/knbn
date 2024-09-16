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

interface BoardStore {
  columns: Column[];
  addColumn: (value: string) => void;
  removeColumn: (id: string) => void;
  updateColumn: (columnId: string, newTitle: string) => void;
  moveColumn: (result: DropResult) => void;
  addCard: (columnId: string, value: string) => void;
  removeCard: (columnId: string, cardId: string) => void;
  updateCard: (columnId: string, cardId: string, value: string) => void;
  moveCard: (result: DropResult) => void;
}

const useBoardStore = create(
  persist<BoardStore>(
    (set) => ({
      columns: [],
      addColumn: (value) => {
        set((state) => {
          const newColumn = { id: Date.now().toString(), value, cards: [] };
          return { columns: [...state.columns, newColumn] };
        });
      },
      removeColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
        }));
      },
      updateColumn: (columnId, newTitle) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId ? { ...column, value: newTitle } : column,
          ),
        }));
      },
      moveColumn: (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        set((state) => {
          const newColumns = [...state.columns];
          const [movedColumn] = newColumns.splice(source.index, 1);
          newColumns.splice(destination.index, 0, movedColumn);
          return { columns: newColumns };
        });
      },
      addCard: (columnId, value) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: [
                    ...(Array.isArray(column.cards) ? column.cards : []),
                    {
                      id: Date.now().toString(),
                      value,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : column,
          ),
        }));
      },
      removeCard: (columnId, cardId) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: column.cards.filter((card) => card.id !== cardId),
                }
              : column,
          ),
        }));
      },
      updateCard: (columnId, cardId, value) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: column.cards.map((card) =>
                    card.id === cardId ? { ...card, value } : card,
                  ),
                }
              : column,
          ),
        }));
      },
      moveCard: (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        set((state) => {
          const newColumns = [...state.columns];
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

          return { columns: newColumns };
        });
      },
    }),
    {
      name: "board-store",
    },
  ),
);

export default useBoardStore;
