import express, { Request } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.ts";
import authenticateToken from "./middleware/auth.ts";
import * as db from "./database/configdb.ts";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();
db.connect();

const app = express();

const limiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_WINDOW_MS! || 15 * 60 * 1000,
  max: +process.env.RATE_LIMIT_MAX! || 100,
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

app.post("/register", async (
  req: Request<{}, {}, {
    username: string;
    password: string;
  }>,
  res,
) => {
  console.log("Register request:", req.body);
  if (!req.body || !req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Nome de usuário e senha são obrigatórios" });
  }
  console.log("Password before hashing:", req);
  const salt = await bcrypt.genSalt(10);
  console.log("Salt:", salt);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  console.log("Hashed password:", hashedPassword);
  try {
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log("Login request:", req.body);
  if (!req.body || !req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Nome de usuário e senha são obrigatórios" });
  }
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "+password",
    );
    console.log("User found:", user);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(400).send({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
});

app.get("/secured-data", authenticateToken, (req, res) => {
  res.send({ message: "Dados seguros" });
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
