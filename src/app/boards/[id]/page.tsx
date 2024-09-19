"use client";
import { useState } from "react";
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
import useBoardStore from "@/store/boardStore";

export default function BoardPage() {
  const { id } = useParams();
  const { getBoardById, addColumn } = useBoardStore();
  const board = getBoardById(id as string);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  const handleAddColumn = () => {
    if (board) {
      addColumn(board.id, columnName);
      setIsDialogOpen(false);
      setColumnName("");
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] flex items-center justify-between p-2">
        <Text variant="h4" as="h2">
          {board.name}
        </Text>
        <Button onClick={() => setIsDialogOpen(true)}>Create Column</Button>
      </div>

      <Board boardId={board.id} />

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
