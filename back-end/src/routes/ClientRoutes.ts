import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

export const ClientRoutes = Router();

ClientRoutes.post("/client", ClientController.save);
ClientRoutes.get("/client", ClientController.list);
ClientRoutes.put("/client/:id", ClientController.update);
ClientRoutes.delete("/client/:id", ClientController.delete);
