import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useBoardStore from "@/store/boardStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { format } from "date-fns";

interface Card {
  id: string;
  value: string;
  createdAt: string;
}

interface BoardCardDetailProps {
  card: Card;
  boardId: string;
  columnId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function BoardCardDetail({
  card,
  boardId,
  columnId,
  isOpen,
  setIsOpen,
}: BoardCardDetailProps) {
  const removeCard = useBoardStore((state) => state.removeCard);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDelete = useCallback(() => {
    removeCard(boardId, columnId, card.id);
    setIsOpen(false);
  }, [removeCard, boardId, columnId, card.id, setIsOpen]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="flex flex-col">
          <DrawerHeader>
            <DrawerDescription>
              Created: {format(new Date(card.createdAt), "EEE, dd MMM yyyy")}
            </DrawerDescription>
            <DrawerTitle>{card.value}</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <Button variant="outline" className="w-full" onClick={handleDelete}>
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetDescription>
            Created: {format(new Date(card.createdAt), "EEE, dd MMM yyyy")}
          </SheetDescription>
          <SheetTitle>{card.value}</SheetTitle>
        </SheetHeader>

        <div className="mt-auto mb-0 flex flex-col gap-2">
          <Button variant="ghost" className="w-full" onClick={handleDelete}>
            Delete Card
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
