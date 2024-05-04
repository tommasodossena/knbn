"use client";
import React, { useState } from "react";

import { BoardColumn } from "@/components/BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Board = () => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <ScrollArea className="w-full h-full">
      <div className="flex gap-4">
        <BoardColumn
          title="Backlog"
          cards={cards.filter((card) => card.columnId === "backlog")}
        />
        <BoardColumn
          title="To Do"
          cards={cards.filter((card) => card.columnId === "todo")}
        />
        <BoardColumn
          title="Doing"
          cards={cards.filter((card) => card.columnId === "in-progress")}
        />
        <BoardColumn
          title="Done"
          cards={cards.filter((card) => card.columnId === "done")}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export { Board };

const DEFAULT_COLUMNS = [
  {
    id: "backlog" as const,
    title: "Backlog",
  },
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
];

export type ColumnId = (typeof DEFAULT_COLUMNS)[number]["id"];

const DEFAULT_CARDS = [
  {
    id: "task1",
    columnId: "done",
    title: "Project initiation and planning",
  },
  {
    id: "task2",
    columnId: "done",
    title: "Gather requirements from stakeholders",
  },
  {
    id: "task3",
    columnId: "done",
    title: "Create wireframes and mockups",
  },
  {
    id: "task4",
    columnId: "in-progress",
    title: "Develop homepage layout",
  },
  {
    id: "task5",
    columnId: "in-progress",
    title: "Design color scheme and typography",
  },
  {
    id: "task6",
    columnId: "todo",
    title: "Implement user authentication",
  },
  {
    id: "task7",
    columnId: "backlog",
    title: "Build contact us page",
  },
];