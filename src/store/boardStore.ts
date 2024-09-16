import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DropResult } from "@hello-pangea/dnd";

interface Card {
  id: string;
  title: string;
  description: string;
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
  moveColumn: (result: DropResult) => void;
  addCard: (columnId: string, title: string, description: string) => void;
  removeCard: (columnId: string, cardId: string) => void;
  updateCard: (
    columnId: string,
    cardId: string,
    title: string,
    description: string,
  ) => void;
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
      addCard: (columnId, title, description) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: [
                    ...(Array.isArray(column.cards) ? column.cards : []),
                    {
                      id: Date.now().toString(),
                      title,
                      description,
                      createdAt: new Date().toISOString(), // Add this line
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
      updateCard: (columnId, cardId, title, description) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: column.cards.map((card) =>
                    card.id === cardId ? { ...card, title, description } : card,
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
