"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Tasks } from "@/components/ui/icon";

import useBoardStore from "@/store/boardStore";
import { AddBoardDialog } from "@/components/AddBoardDialog";

export default function BoardsPage() {
  const { boards, addBoard, removeBoard } = useBoardStore();
  const [isAddBoardDialogOpen, setIsAddBoardDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddBoard = (boardName: string) => {
    addBoard(boardName);
  };

  const handleDeleteBoard = (boardId: string) => {
    removeBoard(boardId);
    setIsDeleteDialogOpen(false);
    setBoardToDelete(null);
  };

  const searchBoards = useMemo(() => {
    return boards.filter((board) =>
      board.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [boards, searchTerm]);

  const getTotalCards = (boardId: string) => {
    const board = useBoardStore.getState().getBoardById(boardId);
    return (
      board?.columns.reduce(
        (total, column) => total + column.cards.length,
        0,
      ) || 0
    );
  };

  return (
    <>
      <div className="h-full flex flex-col gap-1 p-2 pr-4">
        <div className="h-[60px] shrink-0 flex items-center gap-2">
          <Button
            size="icon"
            className="rounded-full aspect-square bg-white dark:bg-sidebar text-accent border border-primary-foreground/40 outline outline-2 outline-secondary hover:bg-secondary dark:hover:bg-secondary hover:shadow-inner hover:shadow-foreground/15 dark:border-input dark:border-x-0 dark:border-b-0 dark:outline-secondary/50"
            onClick={() => setIsAddBoardDialogOpen(true)}
          >
            <Plus />
          </Button>
          <Input
            placeholder="Search Boards"
            className="bg-secondary text-accent rounded-full shadow-inner shadow-foreground/15 dark:shadow-black/10 border-t-0 border-x-0 focus-visible:ring-0 px-5"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
            {searchBoards.map((board) => (
              <Card className="bg-card text-card-foreground" key={board.id}>
                <CardHeader>
                  <CardTitle>{board.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/boards/${board.id}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        View
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBoardToDelete(board.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tasks />
                      <Text variant="p" className="text-accent">
                        {getTotalCards(board.id)}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <AddBoardDialog
        isOpen={isAddBoardDialogOpen}
        onOpenChange={setIsAddBoardDialogOpen}
        onAddBoard={handleAddBoard}
      />

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              board and remove all the related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBoardToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => boardToDelete && handleDeleteBoard(boardToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
