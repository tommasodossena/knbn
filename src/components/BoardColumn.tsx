import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { BoardCard } from "./BoardCard";
import { BoardCardDetail } from "./BoardCardDetail";
import { Button } from "@/components/ui/button";
import { CreateCardDialog } from "@/components/CreateCardDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { Plus, Ellipsis } from "lucide-react";
import useBoardStore from "@/store/boardStore";

interface BoardColumnProps {
  id: string;
  value: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }>;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  id,
  value,
  cards,
  dragHandleProps,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
  } | null>(null);

  const handleCardClick = (card: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }) => {
    setSelectedCard(card);
  };

  return (
    <div className="w-[calc(100vw-3.5rem)] sm:w-[calc(100vw/2-2.5rem)] md:w-96 h-fit flex flex-col gap-2 rounded-lg text-card-foreground shadow-sm p-3 bg-gray-100">
      <BoardColumnHeader
        id={id}
        value={value}
        length={cards.length}
        dragHandleProps={dragHandleProps}
      />
      <Droppable droppableId={id} type="CARD">
        {(provided) => (
          <ScrollArea>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col"
            >
              {cards.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Text>Add a card to get started</Text>
                </div>
              )}
              {Array.isArray(cards) &&
                cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BoardCard
                          id={card.id}
                          title={card.title}
                          description={card.description}
                          createdAt={card.createdAt}
                          onClick={() => handleCardClick(card)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </ScrollArea>
        )}
      </Droppable>
      <Button
        variant={"ghost"}
        className="w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus size={16} />
        <span className="ml-2">Add Card</span>
      </Button>
      <CreateCardDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        columnId={id}
      />
      {selectedCard && (
        <BoardCardDetail
          card={selectedCard}
          columnId={id}
          isOpen={!!selectedCard}
          setIsOpen={(isOpen) => !isOpen && setSelectedCard(null)}
        />
      )}
    </div>
  );
};

interface BoardColumnHeaderProps {
  id: string;
  value: string;
  length: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumnHeader: React.FC<BoardColumnHeaderProps> = ({
  id,
  value,
  length,
  dragHandleProps,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const removeColumn = useBoardStore((state) => state.removeColumn);

  const handleDeleteColumn = () => {
    removeColumn(id);
  };

  return (
    <div
      className="flex items-center justify-between py-2"
      {...dragHandleProps}
    >
      <Text variant="h5" as="p" className="flex items-start">
        <span>{value}</span>
        {length > 0 && (
          <span className="text-muted-foreground text-xs font-medium ml-1">
            ({length})
          </span>
        )}
      </Text>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteColumn}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
