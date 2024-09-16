import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import useBoardStore from "@/store/boardStore";
import { useBoardDragAndDrop } from "@/hooks/useBoardDragAndDrop";

export function Board() {
  const { onDragEnd } = useBoardDragAndDrop();
  const columns = useBoardStore((state) => state.columns);

  if (!columns || columns.length === 0) {
    return (
      <div className="px-4 text-center">
        No columns available. Add a column to get started.
      </div>
    );
  }

  return (
    <>
      <div className="w-full text-center px-4 mb-4">
        <Text as="h2" variant="h6">
          Board Title
        </Text>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <ScrollArea className="flex-1 w-full whitespace-nowrap">
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex w-max mx-auto px-4"
              >
                {columns.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mr-3"
                      >
                        <BoardColumn
                          id={column.id}
                          value={column.value}
                          cards={column.cards || []}
                          dragHandleProps={
                            provided.dragHandleProps ?? undefined
                          }
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
    </>
  );
}
