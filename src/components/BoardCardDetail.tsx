import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface Card {
  id: string;
  title: string;
  description: string;
}

interface BoardCardDetailProps {
  card: Card;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function BoardCardDetail({
  card,
  isOpen,
  setIsOpen,
}: BoardCardDetailProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{card.title}</SheetTitle>
          <SheetDescription>{card.description}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
