import express from "express";
import {
  create,
  deleteTodo,
  fetchAll,
  fetchOne,
  updateFull,
  updatePartial,
} from "../controllers/todo.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router
  .route("/todo")
  .get(authenticateToken, fetchAll)
  .post(authenticateToken, create);

router
  .route("/todo/:id")
  .get(authenticateToken, fetchOne)
  .put(authenticateToken, updateFull)
  .patch(authenticateToken, updatePartial)
  .delete(authenticateToken, deleteTodo);

export default router;
