import { Request, Response } from "express";
import { PublisherService } from "../services/PublisherService";

export class PublisherController {
  static async list(request: Request, response: Response) {
    try {
      const listOfPublishers = await PublisherService.list();
      response.status(200).json(listOfPublishers);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async update(request: Request, response: Response) {
    try {
      const publisherToUpdate = request.body;
      const publisherId = request.params.id;
      const publisherUpdated = await PublisherService.update(
        +publisherId,
        publisherToUpdate
      );
      response.status(200).json(publisherUpdated);
    } catch (e: any) {
      if (e.message === "Publicadora não encontrada!") {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async delete(request: Request, response: Response) {
    try {
      const publisherId = request.params.id;
      await PublisherService.delete(+publisherId);
      response.status(204).send();
    } catch (e: any) {
      if (e.message === "Publicadora não encontrada!") {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async save(request: Request, response: Response) {
    try {
      const publisher = request.body;
      const publisherSaved = await PublisherService.save(publisher);
      response.status(200).json(publisherSaved);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
}
