import "./style.css";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.querySelector(".todo-form") as HTMLFormElement;
const todoList = document.querySelector(".todo-list") as HTMLUListElement;

const todosCollection = collection(db, "todos");

const addTodo = async (text: string) => {
  try {
    await addDoc(todosCollection, {
      text,
      completed: false,
      createdAt: Date.now(),
    });
    todoInput.value = "";
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const removeTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const toggleComplete = async (id: string, currentState: boolean) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !currentState });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const renderTodos = (todos: Todo[]) => {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
      <span style="text-decoration: ${todo.completed ? "line-through" : "none"};">
        ${todo.text}
      </span>
      <button class="complete-btn">${todo.completed ? "Undo" : "Complete"}</button>
      <button class="remove-btn">Remove</button>
    `;

    const completeButton = li.querySelector(".complete-btn") as HTMLButtonElement;
    completeButton.addEventListener("click", () =>
      toggleComplete(todo.id, todo.completed)
    );

    const removeButton = li.querySelector(".remove-btn") as HTMLButtonElement;
    removeButton.addEventListener("click", () => removeTodo(todo.id));

    todoList.appendChild(li);
  });
};

onSnapshot(todosCollection, (snapshot) => {
  const todos: Todo[] = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    todos.push({
      id: docSnap.id,
      text: data.text,
      completed: data.completed,
    });
  });
  renderTodos(todos);
});

todoForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") addTodo(text);
});
