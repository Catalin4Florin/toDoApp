export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: "Low" | "Medium" | "High";
  }
  export type FilterStatus = "all" | "active" | "completed";