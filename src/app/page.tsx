"use client";
import { useState } from "react";
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

export default function App() {
  const { columns, addColumn } = useBoardStore();
  const [columnName, setColumnName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddColumn = () => {
    addColumn(columnName);
    setColumnName("");
    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] flex items-center justify-between gap-2 px-4">
        <Text variant="h3" as="h1">
          knbn
        </Text>
        <Button onClick={() => setIsDialogOpen(true)}>Create Column</Button>
      </div>

      <Board />

      {/* TODO: move dialog a separate component */}
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
