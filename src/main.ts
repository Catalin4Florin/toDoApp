import './style.css'
// import { setupCounter } from './counter.ts'


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;

const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  }
  todos.push(newTodo);
  console.log("check to see if push works:", todos);
  renderTodos();
}

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();//stops reloading of page, so we store stuff in array
  const text = todoInput.value.trim();
  if(text !== ''){
    addTodo(text);
    todoInput.value = '';
    //render later
  }
}) 

const renderTodos = () => {
  todoList.innerHTML = ''; // Clear existing list

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `<span>${todo.text}</span>
    <button>Remove</button>`;

    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li);
    })
}
renderTodos();

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => {
    removeTodo(id);
  });
}

const removeTodo = (id:number) => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}