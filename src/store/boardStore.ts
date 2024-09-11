import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Card {
  id: string;
  title: string;
  description: string;
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
  addCard: (columnId: string, title: string, description: string) => void;
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
      addCard: (columnId, title, description) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  cards: [
                    ...(Array.isArray(column.cards) ? column.cards : []),
                    { id: Date.now().toString(), title, description },
                  ],
                }
              : column,
          ),
        }));
      },
    }),
    {
      name: "board-store",
    },
  ),
);

export default useBoardStore;
