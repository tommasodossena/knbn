export const taskLabels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "refactor",
    label: "Refactor",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "chore",
    label: "Chore",
  },
  {
    value: "test",
    label: "Test",
  },
  {
    value: "performance",
    label: "Performance",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "maintenance",
    label: "Maintenance",
  },
  {
    value: "other",
    label: "Other",
  },
]

export const taskStatuses = [
  {
    id: "backlog" as const,
    title: "Backlog",
  },
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
];

export const taskPriorities = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
]

export type ColumnId = (typeof taskStatuses)[number]["id"] | null;

export const initialTasks = [
  {
    id: "task1",
    columnId: "done" as ColumnId,
    content: "Project initiation and planning",
    label: "Feature",
    priority: "low",
  },
  {
    id: "task2",
    columnId: "in-progress" as ColumnId,
    content: "Designing the application architecture",
    label: "Design",
    priority: "medium",
  },
  {
    id: "task3",
    columnId: "todo" as ColumnId,
    content: "Writing unit tests",
    label: "Test",
    priority: "high",
  },
  {
    id: "task4",
    columnId: "backlog" as ColumnId,
    content: "Refactoring the code",
    label: "Refactor",
    priority: "medium",
  },
  {
    id: "task5",
    columnId: "backlog" as ColumnId,
    content: "Documenting the code",
    label: "Documentation",
    priority: "low",
  },
];
