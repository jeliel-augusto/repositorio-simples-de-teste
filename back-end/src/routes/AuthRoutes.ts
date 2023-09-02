import { AuthMiddleware } from "./../middleware/auth";
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const AuthRoutes = Router();

AuthRoutes.post("/auth/login", AuthController.login);
AuthRoutes.post("/auth/logout", AuthController.logout);
AuthRoutes.get("/auth/info", AuthMiddleware, AuthController.info);
AuthRoutes.post("/auth/sign-up", AuthController.save);
