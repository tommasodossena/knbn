import { useCallback } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import useBoardStore from "@/store/boardStore";

export function useBoardDragAndDrop() {
  const moveCard = useBoardStore((state) => state.moveCard);
  const moveColumn = useBoardStore((state) => state.moveColumn);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { type } = result;
      if (type === "COLUMN") {
        moveColumn(result);
      } else {
        moveCard(result);
      }
    },
    [moveCard, moveColumn],
  );

  return { onDragEnd };
}
