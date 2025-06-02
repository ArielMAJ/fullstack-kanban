import { Request, RequestHandler, type Response } from "express";
import { z } from "zod";
import * as todoService from "../services/todo.js";

const createReqSchema = z.object({
  content: z.string({ required_error: "Conteúdo é obrigatório" }),
  column: z.number().int().min(0).max(2).optional(),
});
const updateFullReqSchema = z.object({
  content: z.string({ required_error: "Conteúdo é obrigatório" }),
  done: z.boolean({ required_error: "Estado é obrigatório" }),
  column: z.number({ required_error: "Conteúdo é obrigatório" }).int().min(0).max(2),
});
const updatePartialReqSchema = z.object({
  content: z.string().optional(),
  done: z.boolean().optional(),
  column: z.number().int().min(0).max(2).optional(),
});

class BadRequestError extends Error {
  constructor(message = "Requisição malformada") {
    super(message);
    this.name = "MalformedRequestError";
  }
}

class NoPermissionError extends Error {
  constructor(message = "Você não tem permissão para acessar este recurso") {
    super(message);
    this.name = "NoPermissionError";
  }
}

function handleError(error: unknown, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ message: error.errors[0].message });
  } else if (error instanceof BadRequestError) {
    res.status(400).send({ message: error.message });
  } else if (error instanceof todoService.TodoNotFoundError) {
    res.status(404).send({ message: error.message });
  } else if (error instanceof Error) {
    res.status(500).send({ message: error.message });
  } else if (error instanceof NoPermissionError) {
    res.status(403).send({ message: error.message });
  } else {
    res.status(500).send({ message: "Erro desconhecido" });
  }
  console.error(error);
}

async function validateOwnership(userId: number, todoId: number) {
  const owns = await todoService.userOwnsTodo(userId, todoId);
  if (!owns) {
    throw new NoPermissionError();
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    const reqData = createReqSchema.parse(req.body);
    const todo = await todoService.createTodo(
      req.user.id,
      reqData.content,
      reqData.column ?? 0
    );
    res.status(201).send({
      id: todo.id,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const fetchAll: RequestHandler = async (req, res) => {
  try {
    const todos = await todoService.getUserTodos(req.user.id);
    res.status(200).send(todos);
  } catch (error) {
    handleError(error, res);
  }
};

function parseTodoId(raw: string) {
  const todoId = parseInt(raw, 10);
  if (isNaN(todoId) || todoId < 0) {
    throw new BadRequestError("ID inválido");
  }
  return todoId;
}

export const fetchOne: RequestHandler = async (req, res) => {
  try {
    const todoId = parseTodoId(req.params.id);
    await validateOwnership(req.user.id, todoId);
    const todo = await todoService.getTodoById(todoId);
    res.status(200).send(todo);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateFull: RequestHandler = async (req, res) => {
  try {
    const todoId = parseTodoId(req.params.id);
    const reqData = updateFullReqSchema.parse(req.body);
    await validateOwnership(req.user.id, todoId);
    await todoService.updateTodo(
      todoId,
      reqData.content,
      reqData.done,
      reqData.column ?? null
    );
    res.status(200).send({
      message: "Todo atualizado com sucesso",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePartial: RequestHandler = async (req, res) => {
  try {
    const todoId = parseTodoId(req.params.id);
    const reqData = updatePartialReqSchema.parse(req.body);
    await validateOwnership(req.user.id, todoId);
    await todoService.updateTodo(
      todoId,
      reqData.content ?? null,
      reqData.done ?? null,
      reqData.column ?? null
    );
    res.status(200).send({
      message: "Todo atualizado com sucesso",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
  try {
    const todoId = parseTodoId(req.params.id);
    await validateOwnership(req.user.id, todoId);
    await todoService.deleteTodo(todoId);
    res.status(200).send({
      message: "Todo deletado com sucesso",
    });
  } catch (error) {
    handleError(error, res);
  }
};
