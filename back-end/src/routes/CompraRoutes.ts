import { Router } from "express";
import { CompraController } from "../controllers/CompraController";
import { AuthMiddleware } from "../middleware/auth";

export const CompraRoutes = Router();
CompraRoutes.get("/client/purchases", AuthMiddleware, CompraController.list);
CompraRoutes.post("/client/buy", AuthMiddleware, CompraController.buyGames);
CompraRoutes.put(
  "/client/purchases/:idCompra",
  AuthMiddleware,
  CompraController.updateBuyGames
);
CompraRoutes.delete(
  "/client/purchases/:id",
  AuthMiddleware,
  CompraController.deleteCompra
);
CompraRoutes.get(
  "/client/purchases/:id",
  AuthMiddleware,
  CompraController.getById
);
