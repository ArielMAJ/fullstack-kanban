import express from "express";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.route("/protected").get(authenticateToken, (req, res) => {
  console.log(req.user)
  res.send({ message: "Acesso autorizado" });
});

export default router;
