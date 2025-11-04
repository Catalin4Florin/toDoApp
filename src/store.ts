import type { Todo } from "./types";

export let todos: Todo[] = [];

export function addTodoItem(todo: Todo): void {
  todos.push(todo);
}

export function setTodos(next: Todo[]): void {
  todos = next;
}

export function findTodo(id: number): Todo | undefined {
  return todos.find(t => t.id === id);
}
