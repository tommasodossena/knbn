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
    value: "backlog",
    label: "Backlog",
  },
  {
    id: "todo" as const,
    value: "todo",
    label: "Todo",
  },
  {
    id: "in-progress" as const,
    value: "in-progress",
    label: "In progress",
  },
  {
    id: "done" as const,
    value: "done",
    label: "Done",
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
    id: "0001",
    columnId: "done" as ColumnId,
    content: "Project initiation and planning",
    label: "feature",
    priority: "low",
  },
  {
    id: "0002",
    columnId: "in-progress" as ColumnId,
    content: "Designing the application architecture",
    label: "design",
    priority: "medium",
  },
  {
    id: "0003",
    columnId: "todo" as ColumnId,
    content: "Writing unit tests",
    label: "test",
    priority: "high",
  },
  {
    id: "0004",
    columnId: "backlog" as ColumnId,
    content: "Refactoring the code",
    label: "refactor",
    priority: "medium",
  },
  {
    id: "0005",
    columnId: "backlog" as ColumnId,
    content: "Documenting the code",
    label: "documentation",
    priority: "low",
  },
];
