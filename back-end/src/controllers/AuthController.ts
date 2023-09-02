import { Request, Response } from "express";
import { AuthRepository } from "../repositories/AuthRepository";
import { AuthService } from "../services/AuthService";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
export class AuthController {
  static async info(request: Request, response: Response) {
    const id = request["user"].id;
    try {
      const user = await AuthService.getById(id);
      return response.status(200).json(user);
    } catch (e: any) {
      console.error(e);
      if (e.message === "Usuário não existe") {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async save(request: Request, response: Response) {
    try {
      const user = request.body;
      const clientSaved = await AuthService.createUser(user);
      const token = await AuthService.createTokenFromUser(clientSaved);
      return response
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json(clientSaved);
    } catch (e: any) {
      if (e.message === "Email já existe") {
        return response.status(400).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const token = await AuthService.login(email, password);
      return response
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ message: "ok" });
    } catch (e: any) {
      response.status(401).json({ message: e.message });
    }
  }
  static async logout(request: Request, response: Response) {
    return response.clearCookie("token").json({ message: "ok" });
  }
}
