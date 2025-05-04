import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import process from "node:process";
import * as db from "./database/configdb.js";
import protectedRouter from "./routes/protected.js";
import userRouter from "./routes/user.js";
import User from "./models/User.js";
import mongoose from "mongoose";

dotenv.config();
db.connect();

const app = express();

const limiter = rateLimit({
  windowMs: +process.env["RATE_LIMIT_WINDOW_MS"]! || 15 * 60 * 1000,
  max: +process.env["RATE_LIMIT_MAX"]! || 100,
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use(userRouter);
app.use(protectedRouter);

// Endpoint para resetar o banco de dados (Para testes)
app.post("/reset", async (req, res) => {
  await User.deleteMany({});

  res.status(200).json({ message: "Banco de dados resetado com sucesso" });
});

app.listen(8080, () => {
  console.log("Servidor ativo na porta 8080");
});
