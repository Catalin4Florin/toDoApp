import "./style.css";

// DOM elements
import { todoForm, todoInput, errorMessage, colorPicker } from "./dom";

// Todo actions / UI interactions
import { addTodoItem, renderTodos, clearCompleted, setFilter, toggleCompleted } from "./ui";
import type { FilterStatus } from "./types";

//  Initial render
renderTodos();

//  Form event handler
todoForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== "") {
    todoInput.classList.remove("input-error");
    if (errorMessage) errorMessage.style.display = "none";
    addTodoItem(text);
    todoInput.value = "";
  } else {
    todoInput.classList.add("input-error");
    if (errorMessage) errorMessage.style.display = "block";
  }
});

//  Color Picker
colorPicker?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  document.body.style.backgroundColor = target.value;
});

//  Clear completed todos
const clearBtn = document.getElementById("clear-completed") as HTMLButtonElement | null;
clearBtn?.addEventListener("click", () => clearCompleted());

//  Filter dropdown
const filterSelect = document.getElementById("filter") as HTMLSelectElement | null;
filterSelect?.addEventListener("change", () =>
  setFilter(filterSelect!.value as FilterStatus)
);
