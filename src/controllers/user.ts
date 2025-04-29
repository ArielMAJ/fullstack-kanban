import bcrypt from "bcryptjs";
import { RequestHandler, type Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterReq = Request<
  {},
  {},
  {
    username: string;
    email: string;
    password: string;
  }
>;

export const register: RequestHandler = async (req: RegisterReq, res) => {
  console.log("Register request:", req.body);
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    res
      .status(400)
      .send({ message: "Nome de usuário, email e senha são obrigatórios" });
    return;
  }

  if (!EMAIL_REGEX.test(req.body.email)) {
    res.status(400).send({ message: "Email inválido" });
    return;
  }

  if (req.body.password.length < 6) {
    res
      .status(400)
      .send({ message: "A senha deve ter pelo menos 6 caracteres" });
    return;
  }

  console.log("Password before hashing:", req);
  const salt = await bcrypt.genSalt(10);
  console.log("Salt:", salt);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  console.log("Hashed password:", hashedPassword);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).send({ message: "Email já está em uso" });
      return;
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

type LoginReq = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;
export const login: RequestHandler = async (req: LoginReq, res) => {
  console.log("Login request:", req.body);
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email e senha são obrigatórios" });
    return;
  }
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log("User found:", user);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env["SECRET_KEY"]!, {
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
};

export const me: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user!.id);
  // .select("-password");
  if (!user) {
    res.status(404).send({ message: "Usuário não encontrado" });
    return;
  }
  res.status(200).json(user);
};
