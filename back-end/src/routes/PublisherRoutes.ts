import { Router } from "express";
import { PublisherController } from "../controllers/PublisherController";

export const PublisherRoutes = Router();

PublisherRoutes.post("/publishers", PublisherController.save);
PublisherRoutes.get("/publishers", PublisherController.list);
PublisherRoutes.put("/publishers/:id", PublisherController.update);
PublisherRoutes.delete("/publishers/:id", PublisherController.delete);
