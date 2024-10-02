import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import useBoardStore from "@/store/boardStore";
import { useBoardDragAndDrop } from "@/hooks/useBoardDragAndDrop";

interface BoardProps {
  boardId: string;
}

export function Board({ boardId }: BoardProps) {
  const { onDragEnd } = useBoardDragAndDrop(boardId);
  const board = useBoardStore((state) => state.getBoardById(boardId));

  if (!board || !board.columns || board.columns.length === 0) {
    return (
      <div className=" flex-1 grid place-content-center">
        <Text className="text-center">
          No columns available. Add a column to get started.
        </Text>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <ScrollArea className="flex-1 w-full whitespace-nowrap">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-max mx-auto"
            >
              {board.columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mr-3 max-h-[calc(100vh-76px)] pb-4"
                    >
                      <BoardColumn
                        boardId={boardId}
                        id={column.id}
                        value={column.value}
                        cards={column.cards || []}
                        dragHandleProps={provided.dragHandleProps ?? undefined}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </Droppable>
    </DragDropContext>
  );
}
