import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BoardStore {
  columns: {
    id: string;
    value: string;
  }[];
  addColumn: (value: string) => void;
  removeColumn: (id: string) => void;
}

const useBoardStore = create(
  persist<BoardStore>(
    (set) => ({
      columns: [],
      addColumn: (value) => {
        set((state) => {
          const newColumn = { id: Date.now().toString(), value };
          return { columns: [...state.columns, newColumn] };
        });
      },
      removeColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
        }));
      },
    }),
    {
      name: "board-store",
    },
  ),
);

export default useBoardStore;
