import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Acesso negado");

  jwt.verify(token, Deno.env.get("SECRET_KEY")!, (err, user) => {
    if (err) return res.status(403).send("Token inválido");
    req.user = user;
    next();
  });
};

export default authenticateToken;
