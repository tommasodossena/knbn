import React from "react";

import { Typography } from "@/components/ui/typography";

interface BoardColumnProps {
  title: string;
  cards: { title: string; id: string; columnId: string }[];
  setCards?: React.Dispatch<React.SetStateAction<{ title: string; id: string; column: string }[]>>;
}

const BoardColumn = ({ title, cards, setCards }: BoardColumnProps) => {
  const id = React.useId();
  
  return (
    <div
      className="flex flex-col w-[250px]"
      id={id}
      aria-labelledby={id}
    >
      <Typography as="h3" variant="h5" className="mb-2">
        {title}
      </Typography>
      <div className="flex flex-col gap-2">
        {cards.map((card) => (
          <div key={card.id} className="p-2 rounded-sm bg-neutral-100 dark:bg-neutral-900">
            <Typography as="p" variant="p">
              {card.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
    
}

export { BoardColumn };