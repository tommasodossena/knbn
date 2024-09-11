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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useBoardStore from "@/store/boardStore";
import { useMediaQuery } from "@/hooks/use-media-query";
interface Card {
  id: string;
  title: string;
  description: string;
}

interface BoardCardDetailProps {
  card: Card;
  columnId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function BoardCardDetail({
  card,
  columnId,
  isOpen,
  setIsOpen,
}: BoardCardDetailProps) {
  const removeCard = useBoardStore((state) => state.removeCard);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDelete = useCallback(() => {
    removeCard(columnId, card.id);
    setIsOpen(false);
  }, [removeCard, columnId, card.id, setIsOpen]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="flex flex-col">
          <DrawerHeader>
            <DrawerTitle>{card.title}</DrawerTitle>
            <DrawerDescription>{card.description}</DrawerDescription>
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
          <SheetTitle>{card.title}</SheetTitle>
          <SheetDescription>{card.description}</SheetDescription>
        </SheetHeader>
        <div className="mt-auto mb-0 flex flex-col gap-2">
          <Button variant="ghost" className="w-full" onClick={handleDelete}>
            Delete Card
          </Button>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1">Save</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
