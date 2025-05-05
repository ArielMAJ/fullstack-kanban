import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
  fetchOne,
  fetchAll,
  updateFull,
  updatePartial,
  deleteTodo,
  create,
} from "../controllers/todo.js";

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
