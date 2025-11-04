import "./style.css";
import { todoForm, todoInput, errorMessage, colorPicker } from "./dom";
import { addTodo, renderTodos, clearCompleted, setFilter } from "./ui";
import type { FilterStatus } from "./types";

// Initial UI
renderTodos();

// Form Listener
todoForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== "") {
    todoInput.classList.remove("input-error");
    if (errorMessage) errorMessage.style.display = "none";
    addTodo(text);
    todoInput.value = "";
  } else {
    todoInput.classList.add("input-error");
    if (errorMessage) errorMessage.style.display = "block";
  }
});

// Color Picker
colorPicker?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  document.body.style.backgroundColor = target.value;
});

// Clear Completed Button
const clearBtn = document.getElementById("clear-completed") as HTMLButtonElement | null;
clearBtn?.addEventListener("click", () => clearCompleted());

// Filter Dropdown
const filterSelect = document.getElementById("filter") as HTMLSelectElement | null;
filterSelect?.addEventListener("change", () =>
  setFilter(filterSelect.value as FilterStatus)
);
