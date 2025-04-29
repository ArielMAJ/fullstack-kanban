import { RequestHandler, type Request } from "express";
import * as userService from "../services/user";

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

  try {
    await userService.register({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

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
    const loginInfo = await userService.login({
      email: req.body.email,
      password: req.body.password,
    });
    if (!loginInfo) {
      res.status(400).send({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const me: RequestHandler = async (req, res) => {
  const user = await userService.me(req.user!.id);
  // .select("-password");
  if (!user) {
    res.status(404).send({ message: "Usuário não encontrado" });
    return;
  }
  res.status(200).json(user);
};
