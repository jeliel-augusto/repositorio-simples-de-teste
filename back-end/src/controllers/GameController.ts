import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
  static async list(request: Request, response: Response) {
    try {
      const listOfGames = await GameService.list();
      response.status(200).json(listOfGames);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async getById(request: Request, response: Response) {
    try {
      const gameId = request.params.id;
      const gameResult = await GameService.getById(+gameId);
      response.status(200).json(gameResult);
    } catch (e: any) {
      if (
        e.message === "game não encontrado" ||
        e.message === "Publicadora não encontrada!"
      ) {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async getByField(request: Request, response: Response) {
    try {
      const { field, value } = request.query;
      const listOfGames = await GameService.getByField(
        field as string,
        value as string
      );
      response.status(200).json(listOfGames);
    } catch (e: any) {
      if (
        e.message === "Busca por campo inválida!" ||
        e.message === "Descrição da busca por campo, inválida!"
      ) {
        return response.status(400).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async update(request: Request, response: Response) {
    try {
      console.log(`metodo update`);
      const gameToUpdate = request.body;
      const gameId = request.params.id;
      const gameUpdated = await GameService.update(+gameId, gameToUpdate);
      response.status(200).json(gameUpdated);
    } catch (e: any) {
      if (e.message === "game não encontrado") {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async linkGameToPublisher(request: Request, response: Response) {
    try {
      const gameId = request.body.gameId;
      const publisherId = request.body.publisherId;
      const resultLink = await GameService.linkGameToPublisher(
        gameId,
        publisherId
      );
      response.status(200).json(resultLink);
    } catch (e: any) {
      if (
        e.message === "game não encontrado" ||
        e.message === "Publicadora não encontrada!"
      ) {
        return response.status(404).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async delete(request: Request, response: Response) {
    try {
      const gameId = request.params.id;
      const gameDeleted = await GameService.delete(+gameId);
      response.status(200).json(gameDeleted);
    } catch (e: any) {
      if (e.message === "game não encontrado") {
        return response.status(404).json({ message: e.message });
      }
      if (
        e.message ===
        "Impossível deletar game, pois há compras relacionadas a ele."
      ) {
        return response.status(400).json({ message: e.message });
      }
      response.status(500).json({ message: e.message });
    }
  }
  static async save(request: Request, response: Response) {
    try {
      const game = request.body;
      const gameSaved = await GameService.save(game);
      response.status(200).json(gameSaved);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
}
