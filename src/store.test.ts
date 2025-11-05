import { describe, it, expect, beforeEach } from "vitest";
import { addTodoItem, setTodos, findTodo } from "./store";
import type { Todo } from "./types";

describe("Todo Store logic", () => {
  beforeEach(() => {
    setTodos([]); // reset todos before each test
  });

  it("adds a todo item", () => {
    const todo: Todo = { id: 1, text: "Test Todo", completed: false };
    addTodoItem(todo);

    const found = findTodo(1);
    expect(found?.text).toBe("Test Todo");
  });

  it("removes a todo after reset", () => {
    const todo: Todo = { id: 2, text: "Another Todo", completed: false };
    addTodoItem(todo);

    setTodos([]);
    const found = findTodo(2);
    expect(found).toBeUndefined();
  });
});
