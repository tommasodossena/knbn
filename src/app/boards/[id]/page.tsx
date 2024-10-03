"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AddItemDialog } from "@/components/AddItemDialog";
import { Board } from "@/components/Board";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Plus } from "@/components/ui/icon";
import useBoardStore from "@/store/boardStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BoardPage() {
  const { id } = useParams();
  const { getBoardById, addColumn, addCard } = useBoardStore();
  const [board, setBoard] = useState<ReturnType<typeof getBoardById> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedBoard = getBoardById(id as string);
      setBoard(fetchedBoard);
      setIsLoading(false);
      if (fetchedBoard && fetchedBoard.columns.length > 0) {
        setSelectedColumnId(fetchedBoard.columns[0].id);
      }
    }
  }, [id, getBoardById]);

  const handleAddColumn = (columnName: string) => {
    if (board) {
      addColumn(board.id, columnName);
      setBoard(getBoardById(board.id));
    }
  };

  const handleAddTask = (taskName: string) => {
    if (board && selectedColumnId) {
      addCard(board.id, selectedColumnId, taskName);
      setBoard(getBoardById(board.id));
    }
  };

  const hasColumns = (board?.columns?.length ?? 0) > 0;

  if (isLoading) {
    return <div className="h-full grid place-content-center">Loading...</div>;
  }

  if (!board) {
    return (
      <div className="h-full grid place-content-center">Board not found</div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative md:pl-2 md:pr-4">
      <div className="h-[60px] flex items-center justify-center p-2 my-2">
        <Text variant="h4" as="h2" className="text-accent">
          {board.name}
        </Text>
      </div>

      <Board boardId={board.id} />

      <div className="fixed bottom-6 right-6 flex flex-col items-end">
        {isMenuOpen && (
          <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2 mb-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setIsAddColumnDialogOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Add Column
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setIsAddTaskDialogOpen(true);
                setIsMenuOpen(false);
              }}
              disabled={!hasColumns}
            >
              Add Task
            </Button>
          </div>
        )}

        <Button
          variant="default"
          size="icon"
          className="rounded-full shadow-lg transition-transform duration-200 ease-in-out mb-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            transform: isMenuOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <AddItemDialog
        isOpen={isAddColumnDialogOpen}
        setIsOpen={setIsAddColumnDialogOpen}
        onSubmit={handleAddColumn}
        title="Add Column"
        description="Enter a name for the new column."
        inputLabel="Column Name"
        submitLabel="Add Column"
      />

      <AddItemDialog
        isOpen={isAddTaskDialogOpen}
        setIsOpen={setIsAddTaskDialogOpen}
        onSubmit={handleAddTask}
        title="Add Task"
        description="Enter a name for the new task and select a column."
        inputLabel="Task Name"
        submitLabel="Add Task"
      >
        <Select
          value={selectedColumnId || undefined}
          onValueChange={(value) => setSelectedColumnId(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent>
            {board.columns.map((column) => (
              <SelectItem key={column.id} value={column.id}>
                {column.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AddItemDialog>
    </div>
  );
}
