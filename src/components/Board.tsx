import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useBoardStore from "@/store/boardStore";

export function Board() {
  const columns = useBoardStore((state) => state.columns);
  const moveCard = useBoardStore((state) => state.moveCard);
  const moveColumn = useBoardStore((state) => state.moveColumn);

  if (!columns || columns.length === 0) {
    return (
      <div className="px-4">
        No columns available. Add a column to get started.
      </div>
    );
  }

  const onDragEnd = (result: DropResult) => {
    const { type } = result;
    if (type === "COLUMN") {
      moveColumn(result);
    } else {
      moveCard(result);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <ScrollArea className="flex-1 w-full whitespace-nowrap">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex w-max px-4"
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
                      className="mr-6"
                    >
                      <BoardColumn
                        id={column.id}
                        value={`Column ${column.value}`}
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
