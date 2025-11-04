import { todos, setTodos, addTodoItem, findTodo } from "./store";
import type { Todo, FilterStatus } from "./types";
import { todoList } from "./dom";

let currentFilter: FilterStatus = "all";

export function setFilter(filter: FilterStatus): void {
  currentFilter = filter;
  renderTodos();
}

function getFilteredTodos(): Todo[] {
  if (currentFilter === "active") return todos.filter(t => !t.completed);
  if (currentFilter === "completed") return todos.filter(t => t.completed);
  return todos; // "all"
}

import type { Todo } from "./types";
import { todoList } from "./dom";

export function renderTodos(): void {
  if (!todoList) return;
  todoList.innerHTML = "";

  const visibleTodos = getFilteredTodos();

  visibleTodos.forEach((todo: Todo) => {
  todos.forEach((todo: Todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" class="todo-check" ${todo.completed ? "checked" : ""} />
      <span class="todo-text">${todo.text}</span>
      <button class="remove">Remove</button>
      <button class="edit">Edit</button>
    `;

    attachEventListeners(li, todo.id);
    todoList.appendChild(li);
  });
}

export function addTodo(text: string): void {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  addTodoItem(newTodo);
  renderTodos();
}

export function clearCompleted(): void {
  setTodos(todos.filter(todo => !todo.completed));
  renderTodos();
}

export function removeTodo(id: number): void {
  const filtered = todos.filter(todo => todo.id !== id);
  setTodos(filtered);
  renderTodos();
}

export function editTodo(id: number): void {
  const todo = findTodo(id);
  if (!todo) return;
  const text = prompt("Edit todo", todo.text);
  if (!text) return;
  todo.text = text.trim();
  renderTodos();
}

export function toggleCompleted(id: number): void {
  const todo = findTodo(id);
  if (!todo) return;
  todo.completed = !todo.completed;
  renderTodos();
}

export function clearCompleted(): void {
  setTodos(todos.filter(todo => !todo.completed));
  renderTodos();
}

function attachEventListeners(li: HTMLLIElement, id: number) {
  li.querySelector(".remove")?.addEventListener("click", () => removeTodo(id));
  li.querySelector(".edit")?.addEventListener("click", () => editTodo(id));
  li.querySelector(".todo-check")?.addEventListener("click", () => toggleCompleted(id));
}
