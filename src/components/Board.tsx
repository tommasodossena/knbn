import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useBoardStore from "@/store/boardStore";

export function Board() {
  const columns = useBoardStore((state) => state.columns);

  if (!columns || columns.length === 0) {
    return (
      <div className="px-4">
        No columns available. Add a column to get started.
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 w-full whitespace-nowrap">
      <div className="flex w-max space-x-6 px-4">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            id={column.id}
            value={`Column ${column.value}`}
            cards={column.cards || []}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
