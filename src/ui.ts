import { todos, setTodos, addTodoItem, findTodo } from "./store";
import type { Todo } from "./types";
import { todoList } from "./dom";

export function renderTodos(): void {
  todoList.innerHTML = "";
  todos.forEach((todo: Todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
      <span>${todo.text}</span>
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

function attachEventListeners(li: HTMLLIElement, id: number) {
  li.querySelector(".remove")?.addEventListener("click", () => removeTodo(id));
  li.querySelector(".edit")?.addEventListener("click", () => editTodo(id));
}
