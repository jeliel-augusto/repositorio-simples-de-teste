import { GameRepository } from "./../repositories/GameRepository";
import { CompraService } from "./CompraService";
import { PublisherService } from "./PublisherService";
/**
 * Um service --> possui um repositório
 * Um service --> consome outros serviços
 */
export class GameService {
  static async list() {
    return await GameRepository.getAllGames();
  }
  static async save(game: any) {
    this.validateGame(game);
    await PublisherService.getPublisherById(game.id_publisher);
    const gameSaved = await GameRepository.save(game);
    return gameSaved;
  }
  static async update(id: number, game: any) {
    await GameRepository.getById(id);
    this.validateGame(game);
    const gameUpdated = await GameRepository.update(id, game);
    return gameUpdated;
  }
  static async linkGameToPublisher(id_game: number, id_publisher: number) {
    await GameRepository.getById(id_game);
    await PublisherService.getPublisherById(id_publisher);
    const resultLink = await GameRepository.linkGameToPublisher(
      id_publisher,
      id_game
    );
    return resultLink;
  }
  static async delete(id: number) {
    await this.validateDeleteGame(id);
    await GameRepository.getById(id);
    const gameDeleted = await GameRepository.delete(id);
    return gameDeleted;
  }

  static async getById(id: number) {
    return await GameRepository.getById(id);
  }
  static async getByField(field: string, value: string) {
    this.validateFieldSearch(field, value);
    return await GameRepository.getByField(field, value);
  }
  static validateFieldSearch(field: string, value: string) {
    if (field !== "id" && field !== "name" && field !== "publisher") {
      throw new Error("Busca por campo inválida!");
    }
    if (!value || value.length === 0) {
      throw new Error("Descrição da busca por campo, inválida!");
    }
  }
  static async validateDeleteGame(gameId: number) {
    const itens = await CompraService.getItensCompraByGame(gameId);
    if (itens.length > 0)
      throw new Error(
        "Impossível deletar game, pois há compras relacionadas a ele."
      );
  }
  static validateGame(game: any) {
    if (game.name.length === 0) throw new Error("game nao tem nome");
    if (game.img_src.length === 0) throw new Error("game nao tem imagem");
    if (game.img_src.length > 200)
      throw new Error("link da imagem muito longa!");
    if (!game.id_publisher) throw new Error("Game não possui publicadora!");
  }
}
