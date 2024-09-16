import { useState, memo } from "react";
import useBoardStore from "@/store/boardStore";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Plus, Ellipsis, Trash, PencilLine } from "lucide-react";

import { BoardCard } from "@/components/BoardCard";
import { BoardCardDetail } from "@/components/BoardCardDetail";
import { Button } from "@/components/ui/button";
import { CreateCardDialog } from "@/components/CreateCardDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { EditableField } from "@/components/EditableField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";

interface BoardColumnProps {
  id: string;
  value: string;
  cards: Array<{
    id: string;
    value: string;
    createdAt: string;
  }>;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumn: React.FC<BoardColumnProps> = memo(
  ({ id, value, cards, dragHandleProps }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<{
      id: string;
      value: string;
      createdAt: string;
    } | null>(null);

    const handleCardClick = (card: {
      id: string;
      value: string;
      createdAt: string;
    }) => {
      setSelectedCard(card);
    };

    return (
      <div className="w-[calc(100vw-3.5rem)] sm:w-[calc(100vw/2-2.5rem)] md:w-72 h-fit flex flex-col gap-1 rounded-lg text-card-foreground shadow-sm py-2 bg-gray-100">
        <BoardColumnHeader
          id={id}
          value={value}
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
                  <div className="flex items-center justify-center h-[43px]">
                    <Text variant="mutedText">Add a card to get started</Text>
                  </div>
                )}
                {Array.isArray(cards) &&
                  cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <BoardCard
                            id={card.id}
                            value={card.value}
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
  },
);

interface BoardColumnHeaderProps {
  id: string;
  value: string;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumnHeader: React.FC<BoardColumnHeaderProps> = ({
  id,
  value,
  dragHandleProps,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const removeColumn = useBoardStore((state) => state.removeColumn);
  const updateColumnTitle = useBoardStore((state) => state.updateColumn);

  const handleDeleteColumn = () => {
    removeColumn(id);
  };

  const handleSaveTitle = (newTitle: string) => {
    updateColumnTitle(id, newTitle);
  };

  return (
    <div className="flex items-center justify-between p-2" {...dragHandleProps}>
      <EditableField
        initialValue={value}
        onSave={handleSaveTitle}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {!isEditing && (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger>
            <Ellipsis size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PencilLine className="mr-2 h-4 w-4" />
                Edit Title
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={handleDeleteColumn}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
