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
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const auth = getAuth();

const emailInput = document.getElementById("email-input") as HTMLInputElement;
const passwordInput = document.getElementById("password-input") as HTMLInputElement;
const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
const registerBtn = document.getElementById("register-btn") as HTMLButtonElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const errorDiv = document.createElement("div");

errorDiv.style.color = "red";
errorDiv.style.fontSize = "0.9em";
errorDiv.style.marginTop = "8px";
emailInput.insertAdjacentElement("afterend", errorDiv);

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.querySelector(".todo-form") as HTMLFormElement;
const todoList = document.querySelector(".todo-list") as HTMLUListElement;
const authSection = document.getElementById("auth-section") as HTMLDivElement;
const todoSection = document.getElementById("todo-section") as HTMLDivElement;

let unsubscribe: (() => void) | null = null;

const getTodosCollection = (uid: string) => collection(db, "users", uid, "todos");

const addTodo = async (uid: string, text: string) => {
  const todosCollection = getTodosCollection(uid);
  await addDoc(todosCollection, {
    text,
    completed: false,
    createdAt: Date.now(),
  });
  todoInput.value = "";
};

const removeTodo = async (uid: string, id: string) => {
  await deleteDoc(doc(db, "users", uid, "todos", id));
};

const toggleComplete = async (uid: string, id: string, currentState: boolean) => {
  const todoRef = doc(db, "users", uid, "todos", id);
  await updateDoc(todoRef, { completed: !currentState });
};

const renderTodos = (uid: string, todos: Todo[]) => {
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
      toggleComplete(uid, todo.id, todo.completed)
    );

    const removeButton = li.querySelector(".remove-btn") as HTMLButtonElement;
    removeButton.addEventListener("click", () => removeTodo(uid, todo.id));

    todoList.appendChild(li);
  });
};

const subscribeToTodos = (uid: string) => {
  if (unsubscribe) unsubscribe();
  const todosCollection = getTodosCollection(uid);
  unsubscribe = onSnapshot(todosCollection, (snapshot) => {
    const todos: Todo[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      todos.push({
        id: docSnap.id,
        text: data.text,
        completed: data.completed,
      });
    });
    renderTodos(uid, todos);
  });
};

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  errorDiv.textContent = "";
  if (!email || !password) return;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      errorDiv.textContent = "No account found with that email. Please register first.";
    } else if (error.code === "auth/wrong-password") {
      errorDiv.textContent = "Incorrect password.";
    } else {
      errorDiv.textContent = "Login failed. Please register first.";
    }
  }
});

registerBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  errorDiv.textContent = "";
  if (!email || !password) return;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      errorDiv.textContent = "That email is already registered.";
    } else if (error.code === "auth/weak-password") {
      errorDiv.textContent = "Password should be at least 6 characters.";
    } else {
      errorDiv.textContent = "Registration failed. Please try again.";
    }
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

todoForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return;
  const text = todoInput.value.trim();
  if (text !== "") addTodo(user.uid, text);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    todoSection.style.display = "block";
    subscribeToTodos(user.uid);
  } else {
    authSection.style.display = "block";
    todoSection.style.display = "none";
    todoList.innerHTML = "";
    if (unsubscribe) unsubscribe();
  }
});
