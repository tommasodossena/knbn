import { useState, memo } from "react";
import useBoardStore from "@/store/boardStore";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { AddItemDialog } from "@/components/AddItemDialog";
import { BoardCard } from "@/components/BoardCard";
import { BoardCardDetail } from "@/components/BoardCardDetail";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "@/components/ui/icon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { EditableField } from "@/components/EditableField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";

interface BoardColumnProps {
  boardId: string;
  id: string;
  value: string;
  cards: Array<{
    id: string;
    value: string;
    createdAt: string;
  }>;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  boardId,
  id,
  value,
  cards,
  dragHandleProps,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    value: string;
    createdAt: string;
  } | null>(null);

  const addCard = useBoardStore((state) => state.addCard);

  const handleCardClick = (card: {
    id: string;
    value: string;
    createdAt: string;
  }) => {
    setSelectedCard(card);
  };

  const handleAddCard = (cardTitle: string) => {
    addCard(boardId, id, cardTitle);
  };

  return (
    <div className="w-[calc(100vw-76px-3.5rem)] sm:w-[calc(100vw/2-76px)] md:w-72 min-h-[100px] max-h-full flex flex-col rounded-lg bg-card text-card-foreground shadow-sm">
      <BoardColumnHeader
        boardId={boardId}
        id={id}
        value={value}
        lenght={cards?.length || 0}
        dragHandleProps={dragHandleProps}
      />

      <Droppable droppableId={id} type="CARD">
        {(provided) => (
          <ScrollArea className="flex-grow overflow-y-auto">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col px-2"
            >
              {cards.length === 0 && (
                <div className="flex items-center justify-center h-[43px]">
                  <Text variant="mutedText">Add a card to get started</Text>
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
      <div className="p-2">
        <Button
          variant={"ghost"}
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus />
          <span className="ml-2">Add Card</span>
        </Button>
      </div>

      <AddItemDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSubmit={handleAddCard}
        title="Add Card"
        description="Enter a title for the new card."
        inputLabel="Card Title"
        submitLabel="Add Card"
      />

      {selectedCard && (
        <BoardCardDetail
          card={selectedCard}
          boardId={boardId}
          columnId={id}
          isOpen={!!selectedCard}
          setIsOpen={(isOpen) => !isOpen && setSelectedCard(null)}
        />
      )}
    </div>
  );
};

interface BoardColumnHeaderProps {
  boardId: string;
  id: string;
  value: string;
  lenght: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const BoardColumnHeader: React.FC<BoardColumnHeaderProps> = ({
  boardId,
  id,
  value,
  lenght,
  dragHandleProps,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const removeColumn = useBoardStore((state) => state.removeColumn);
  const updateColumnTitle = useBoardStore((state) => state.updateColumn);

  const handleDeleteColumn = () => {
    removeColumn(boardId, id);
  };

  const handleSaveTitle = (newTitle: string) => {
    updateColumnTitle(boardId, id, newTitle);
  };

  return (
    <div
      className="flex items-center justify-between px-2 py-3"
      {...dragHandleProps}
    >
      <div className="flex-1 flex items-center justify-start gap-2">
        <EditableField
          variant="h6"
          initialValue={value}
          onSave={handleSaveTitle}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          className="text-accent"
        />
        {!isEditing && (
          <div className="grid place-content-center border border-foreground/15 dark:border-accent/15 rounded-md tabular-nums min-w-6 h-6">
            <Text className="text-xs text-accent">{lenght}</Text>
          </div>
        )}
      </div>

      {!isEditing && (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger>
            <Minus className="p-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            sideOffset={10}
            align="end"
            className="w-[200px]"
          >
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
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
