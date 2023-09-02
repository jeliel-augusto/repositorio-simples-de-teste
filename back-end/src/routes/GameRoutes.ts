import { Router } from "express";
import { GameController } from "../controllers/GameController";

export const GameRoutes = Router();

GameRoutes.post("/games", GameController.save);
GameRoutes.get("/games", GameController.list);
GameRoutes.get("/games/search", GameController.getByField);
GameRoutes.put("/games/link-publisher", GameController.linkGameToPublisher);

GameRoutes.get("/games/:id", GameController.getById);
GameRoutes.put("/games/:id", GameController.update);
GameRoutes.delete("/games/:id", GameController.delete);

/**
 * FRONT END
 * CRUD -> Publicadora
 * CRUD -> Games
 * Painel Admin da Publicadora
 * --> A publicadora excluir APENAS os seus games
 * --> A publicadora pode transferir um game para outra publicadora
 * Autenticação e Autorização
 * Deploys
 */
