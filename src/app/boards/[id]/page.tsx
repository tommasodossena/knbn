"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Board } from "@/components/Board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Plus } from "@/components/ui/icon";
import useBoardStore from "@/store/boardStore";

export default function BoardPage() {
  const { id } = useParams();
  const { getBoardById, addColumn } = useBoardStore();
  const [board, setBoard] = useState<ReturnType<typeof getBoardById> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  useEffect(() => {
    if (id) {
      const fetchedBoard = getBoardById(id as string);
      setBoard(fetchedBoard);
      setIsLoading(false);
    }
  }, [id, getBoardById]);

  const handleAddColumn = () => {
    if (board) {
      addColumn(board.id, columnName);
      setIsDialogOpen(false);
      setColumnName("");
    }
  };

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

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-lg"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Add Column</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Column Name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleAddColumn}
              disabled={!columnName}
            >
              Add Column
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
