import Todo from "../models/Todo.js";

export class TodoNotFoundError extends Error {
  constructor(message = "Todo não encontrado") {
    super(message);
    this.name = "TodoNotFoundError";
  }
}

export const createTodo = async (
  userId: number,
  content: string,
  column: number = 0
) => {
  return await Todo.create({
    userId,
    content,
    done: false,
    column,
  });
};

export const userOwnsTodo = async (userId: number, id: number) => {
  const todo = await Todo.findOne({ where: { id } });
  if (!todo) {
    throw new TodoNotFoundError();
  }
  return todo.userId === userId;
};

export const getUserTodos = async (userId: number) => {
  return await Todo.findAll({ where: { userId } });
};

export const getTodoById = async (id: number) => {
  return await Todo.findOne({ where: { id } });
};

export const updateTodo = async (
  id: number,
  content: string | null,
  done: boolean | null,
  column: number | null = null
) => {
  const todo = await getTodoById(id);
  if (!todo) {
    throw new TodoNotFoundError();
  }
  return await todo.update({
    content: content ?? todo.content,
    done: done ?? todo.done,
    column: column ?? todo.column,
  });
};

export const deleteTodo = async (id: number) => {
  const todo = await getTodoById(id);
  if (!todo) {
    throw new TodoNotFoundError();
  }
  return await todo.destroy();
};
