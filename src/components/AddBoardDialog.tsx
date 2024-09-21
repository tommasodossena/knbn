import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AddBoardDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBoard: (boardName: string) => void;
}

export function AddBoardDialog({
  isOpen,
  onOpenChange,
  onAddBoard,
}: AddBoardDialogProps) {
  const [newBoardName, setNewBoardName] = useState("");

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      onAddBoard(newBoardName);
      setNewBoardName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Board</DialogTitle>
          <DialogDescription>
            Add a new board to your workspace.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Board Name"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBoard}>Add Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
