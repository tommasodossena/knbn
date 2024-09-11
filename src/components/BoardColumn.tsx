import { BoardCard } from "./BoardCard";
import { Button } from "@/components/ui/button";
import { CreateCardDialog } from "@/components/CreateCardDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { Plus } from "lucide-react";
import { useState } from "react";

interface BoardColumnProps {
  id: string;
  value: string;
  cards: Array<{ id: string; title: string; description: string }>;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  id,
  value,
  cards,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-72 flex flex-col gap-4 rounded-lg border bg-card text-card-foreground shadow-sm p-2">
      <BoardColumnHeader value={value} />
      <ScrollArea className="h-[500px]">
        <div className="flex flex-col gap-2">
          {Array.isArray(cards) &&
            cards.map((card) => (
              <BoardCard
                key={card.id}
                title={card.title}
                description={card.description}
              />
            ))}
        </div>
      </ScrollArea>
      <Button
        variant={"ghost"}
        className="w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus size={16} />
        <span className="ml-2">Add Task</span>
      </Button>
      <CreateCardDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        columnId={id}
      />
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
      <Text variant="h5" as="p">
        {value}
      </Text>
    </div>
  );
};
