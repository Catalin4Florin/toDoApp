import "./style.css";
import { todoForm, todoInput, errorMessage, colorPicker } from "./dom";
import { addTodo } from "./ui";
import { clearCompleted } from "./ui";

// Initial render
import { renderTodos } from "./ui";
renderTodos();

// Form event
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

// Clear completed button
const clearBtn = document.getElementById("clear-completed") as HTMLButtonElement | null;
clearBtn?.addEventListener("click", () => clearCompleted());

// Background Color Picker
colorPicker?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  document.body.style.backgrou
