import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export class ClientController {
  static async list(request: Request, response: Response) {
    try {
      const listOfClients = await ClientService.list();
      return response.status(200).json(listOfClients);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async update(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const clientToUpdate = request.body;
      const clientUpdated = await ClientService.update(+id, clientToUpdate);
      return response.status(200).json(clientUpdated);
    } catch (e: any) {
      if (e.message === "Cliente não encontrado") {
        return response.status(404).json({ message: e.message });
      }
      if (e.message === "Email já existe") {
        return response.status(400).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async delete(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const clientDeleted = await ClientService.delete(+id);
      return response.status(200).json(clientDeleted);
    } catch (e: any) {
      if (e.message === "Cliente não encontrado") {
        return response.status(404).json({ message: e.message });
      }

      response.status(500).json({ message: e.message });
    }
  }

  static async save(request: Request, response: Response) {
    try {
      const clientToSave = request.body;
      const clientSaved = await ClientService.save(clientToSave);
      return response.status(200).json(clientSaved);
    } catch (e: any) {
      if (e.message === "Cliente não encontrado") {
        return response.status(404).json({ message: e.message });
      }
      if (e.message === "Email já existe") {
        return response.status(400).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
}
