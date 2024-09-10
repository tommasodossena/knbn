import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BoardColumnProps {
  id: string;
  value: string;
  children: React.ReactNode;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  id,
  value,
  children,
}) => {
  return (
    <div className="w-[250px] flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <BoardColumnHeader value={value} />
      <ScrollArea className="h-28">
        <div className="flex flex-col">{children}</div>
      </ScrollArea>
      <div className="flex items-center justify-between">
        <Button className="w-full">Add Card</Button>
      </div>
    </div>
  );
};

interface BoardColumnHeaderProps {
  value: string;
}

export const BoardColumnHeader: React.FC<BoardColumnHeaderProps> = ({
  value,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
};
