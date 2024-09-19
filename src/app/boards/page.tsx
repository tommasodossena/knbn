"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheckBig } from "lucide-react";
import useBoardStore from "@/store/boardStore";

export default function BoardsPage() {
  const { boards, addBoard, removeBoard } = useBoardStore();
  const [newBoardName, setNewBoardName] = useState("");

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      addBoard(newBoardName);
      setNewBoardName("");
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    removeBoard(boardId);
  };

  return (
    <div className="h-full flex flex-col gap-1 p-2 pr-4 bg-white dark:bg-black">
      <div className="h-[60px] shrink-0 flex items-center gap-2">
        <Button onClick={handleAddBoard}>Add Board</Button>
        <Input
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New Board Name"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
          {boards.map((board) => (
            <Card className="dark:bg-neutral-900" key={board.id}>
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
                      onClick={() => handleDeleteBoard(board.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheckBig size={14} />
                    <Text variant="p">2/14</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
