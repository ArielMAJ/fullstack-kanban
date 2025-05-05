import { RequestHandler, type Response } from "express";
import { z } from "zod/index.js";
import * as todoService from "../services/todo.js";

const createReqSchema = z.object({
  content: z.string().min(1, { message: "Conteúdo é obrigatório" }),
});
const updateFullReqSchema = z.object({
  id: z.number().min(1, { message: "ID é obrigatório" }),
  content: z.string().min(1, { message: "Conteúdo é obrigatório" }),
  done: z.boolean({ required_error: "Estado é obrigatório" }),
});
const updatePartialReqSchema = z.object({
  id: z.number().min(1, { message: "ID é obrigatório" }),
  content: z.string().optional(),
  done: z.boolean().optional(),
});
const deleteReqSchema = z.object({
  id: z.number().min(1, { message: "ID é obrigatório" }),
});
const fetchAllReqSchema = z.object({});
const fetchOneReqSchema = z.object({
  id: z.number().min(1, { message: "ID é obrigatório" }),
});

function handleError(error: unknown, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ message: error.errors[0].message });
  } else if (error instanceof todoService.TodoNotFoundError) {
    res.status(404).send({ message: error.message });
  } else if (error instanceof Error) {
    res.status(500).send({ message: error.message });
  } else if (error instanceof NoPermissionError) {
    res.status(403).send({ message: error.message });
  } else {
    res.status(500).send({ message: "Erro desconhecido" });
  }
}

class NoPermissionError extends Error {
  constructor(message = "Você não tem permissão para acessar este recurso") {
    super(message);
    this.name = "NoPermissionError";
  }
}

async function validateOwnership(userId: number, todoId: number) {
  const owns = await todoService.userOwnsTodo(userId, todoId);
  if (!owns) {
    throw new NoPermissionError();
  }
}

export const create: RequestHandler = async (req, res) => {
  console.log("Create TODO request:", req.body);

  try {
    const reqData = createReqSchema.parse(req.body);

    const todo = await todoService.createTodo(req.user.id, reqData.content);

    res.status(201).send({
      id: todo.id,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const fetchAll: RequestHandler = async (req, res) => {
  console.log("Fetch all todos request:", req.body);

  try {
    fetchAllReqSchema.parse(req.body);

    const todos = await todoService.getUserTodos(req.user.id);
    res.status(200).send(todos);
  } catch (error) {
    handleError(error, res);
  }
};

export const fetchOne: RequestHandler = async (req, res) => {
  console.log("Fetch one todo request:", req.body);

  try {
    const reqData = fetchOneReqSchema.parse(req.body);

    await validateOwnership(req.user.id, reqData.id);

    const todo = await todoService.getTodoById(reqData.id);
    res.status(200).send(todo);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateFull: RequestHandler = async (req, res) => {
  console.log("Update full todo request:", req.body);

  try {
    const reqData = updateFullReqSchema.parse(req.body);

    await validateOwnership(req.user.id, reqData.id);

    await todoService.updateTodo(reqData.id, reqData.content, reqData.done);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePartial: RequestHandler = async (req, res) => {
  console.log("Update partial todo request:", req.body);

  const reqData = updatePartialReqSchema.parse(req.body);

  await validateOwnership(req.user.id, reqData.id);

  try {
    await todoService.updateTodo(
      reqData.id,
      reqData.content ?? null,
      reqData.done ?? null
    );
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
  console.log("Delete todo request:", req.body);

  const reqData = deleteReqSchema.parse(req.body);

  await validateOwnership(req.user.id, reqData.id);

  try {
    await todoService.deleteTodo(reqData.id);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
};
