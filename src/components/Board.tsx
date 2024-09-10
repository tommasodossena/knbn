import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface BoardProps {
  columns: {
    id: string;
    value: string;
  }[];
}

export function Board({ columns }: BoardProps) {
  return (
    <>
      <ScrollArea className="flex-1 w-full whitespace-nowrap">
        <div className="flex w-max space-x-10 px-4">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              id={column.id}
              value={`Column ${column.value}`}
            >
              <div>Task list</div>
            </BoardColumn>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
