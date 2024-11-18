export const DEFAULT_BOARD = {
  id: "welcome",
  name: "Welcome to knbn",
  columns: [
    {
      id: "col-1",
      value: "Getting Started",
      cards: [
        {
          id: "card-1",
          value:
            "Welcome to Knbn! This is a simple and intuitive Kanban board to help you organize your tasks and projects.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "card-2",
          value:
            "Click the '+' button in the sidebar to create a new board. Each board can represent a project or area of work.",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "col-2",
      value: "Features",
      cards: [
        {
          id: "card-3",
          value: "Drag and drop cards between columns to update their status",
          createdAt: new Date().toISOString(),
        },
        {
          id: "card-4",
          value: "Click on a card to view more details and options",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "col-3",
      value: "Tips & Tricks",
      cards: [
        {
          id: "card-5",
          value: "Reorder columns by dragging them horizontally",
          createdAt: new Date().toISOString(),
        },
        {
          id: "card-6",
          value: "Use the search bar to quickly find your boards",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
};
