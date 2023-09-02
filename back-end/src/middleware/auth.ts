import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { config } from "dotenv";
import { User } from "../entities/User";
config();
const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const authToken = req.cookies.token;
  // console.log(authToken, req.cookies);
  if (!authToken)
    return res.status(403).json({ message: "Acesso não autorizado." });
  try {
    const decoded = jwt.verify(authToken, JWT_SECRET!);
    req["user"] = decoded;
    return next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Token inválido." });
  }
};
