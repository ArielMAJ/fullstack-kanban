import express from "express";
import { login, me, register } from "../controllers/user.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(authenticateToken, me);

export default router;
