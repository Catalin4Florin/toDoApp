import { beforeAll, describe, it, expect, beforeEach } from "vitest";
import type { Todo } from "./types";

beforeAll(async () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  (global as any).localStorage = localStorageMock;
});

let addTodoItem: any, setTodos: any, findTodo: any;

beforeAll(async () => {
  const storeModule = await import("./store");
  addTodoItem = storeModule.addTodoItem;
  setTodos = storeModule.setTodos;
  findTodo = storeModule.findTodo;
});

describe("Todo Store logic", () => {
  beforeEach(() => {
    setTodos([]);
  });

  it("adds a todo item", () => {
    const todo: Todo = { id: 1, text: "Test Todo", completed: false, priority: "Low" };
    addTodoItem(todo);
    const found = findTodo(1);
    expect(found?.text).toBe("Test Todo");
  });

  it("removes a todo after reset", () => {
    const todo: Todo = { id: 2, text: "Another Todo", completed: false, priority: "Medium" };
    addTodoItem(todo);
    setTodos([]);
    const found = findTodo(2);
    expect(found).toBeUndefined();
  });
});
