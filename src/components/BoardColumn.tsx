import { BoardCard } from "./BoardCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import useBoardStore from "@/store/boardStore";
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
  const [newCardTitle, setNewCardTitle] = useState("");
  const addCard = useBoardStore((state) => state.addCard);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(id, newCardTitle, "");
      setNewCardTitle("");
    }
  };

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
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="New card title"
          className="flex-1 px-2 py-1 border rounded"
        />
        <Button onClick={handleAddCard}>Add</Button>
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
      <Text variant="h5" as="p">
        {value}
      </Text>
    </div>
  );
};
