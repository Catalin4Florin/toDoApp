import type { Todo } from "./types";

const STORAGE_KEY = "todos-v1";

export let todos: Todo[] = loadTodos();

export function addTodoItem(todo: Todo): void {
  todos.push(todo);
  saveTodos();
}

export function setTodos(next: Todo[]): void {
  todos = next;
  saveTodos();
}

export function findTodo(id: number): Todo | undefined {
  return todos.find(t => t.id === id);
}

// === LocalStorage handling ===
function saveTodos(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
