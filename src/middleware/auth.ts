import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).send({ message: "Acesso negado" });
    return;
  }

  jwt.verify(token, process.env["SECRET_KEY"]!, (err, user) => {
    if (err) {
      res.status(403).send({ message: "Token inválido" });
      return;
    }
    req.user = user as { id: number };
    console.log(req.user);
    next();
  });
};

export default authenticateToken;
