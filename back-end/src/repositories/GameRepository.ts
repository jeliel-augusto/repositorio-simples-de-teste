import { knexConnection } from "../db/db";
import { Game } from "../entities/Game";
import { PublisherRepository } from "./PublisherRepository";
export class GameRepository {
  static async save(game: Game) {
    const resultInsert = await knexConnection.raw(`
            INSERT INTO games(name, img_src, id_publisher, price) 
            VALUES('${game.name}', '${game.img_src}', '${
      game.id_publisher
    }', '${game.price ? game.price : 0.99}') RETURNING ID`);
    const idEntity = resultInsert.rows[0].id;
    return this.getById(idEntity);
  }

  static async linkGameToPublisher(id_publisher: number, id_game: number) {
    const result = await knexConnection.raw(`
          UPDATE games SET id_publisher = '${id_publisher}' WHERE id = '${id_game}'
    `);
    return this.getById(id_game);
  }

  static async getAllGames() {
    const list = await knexConnection.raw(`
      SELECT * FROM games
    `);
    const entities = list.rows as Array<{
      id: number;
      name: string;
      img_src: string;
      id_publisher?: number;
    }>;

    const games = await this.mapGameEntities(entities);
    return games;
  }
  static async mapGameEntities(entities: Partial<Game>[]) {
    return await Promise.all(
      entities.map(async (entity) => {
        const game = new Game(
          entity.id!,
          entity.name!,
          entity.img_src!,
          entity.id_publisher,
          entity.price
        );
        if (game.id_publisher) {
          game.publisher = await PublisherRepository.getById(game.id_publisher);
        }
        return game;
      })
    );
  }
  static async update(id: number, gameUpdated: Game) {
    const resultUpdate = await knexConnection.raw(`
        UPDATE games SET name = '${gameUpdated.name}', 
                         img_src = '${gameUpdated.img_src}',
                         id_publisher = '${gameUpdated.id_publisher}',
                         price = '${
                           gameUpdated.price ? gameUpdated.price : 0.99
                         }'
        WHERE id = ${id}
    `);
    return this.getById(id);
  }
  static async getByField(field: string, value: string) {
    let whereClause = ` WHERE \"${field.replace("'", "").replace("`", "")}\" `;
    if (field === "name") {
      whereClause += ` LIKE '%${value}%'`;
    } else if (field === "publisher") {
      whereClause = ` LEFT JOIN publishers ON id_publisher = publishers.id WHERE publishers.name LIKE '%${value}%'`;
    } else if (field === "id") {
      whereClause += ` = '${value}'`;
    } else {
      whereClause = "WHERE 1";
    }
    const list = await knexConnection.raw(`
      SELECT * FROM games ${whereClause}
    `);

    const entities = list.rows as Array<{
      id: number;
      name: string;
      img_src: string;
      id_publisher?: number;
    }>;
    const games = await this.mapGameEntities(entities);
    return games;
  }
  static async delete(id: number) {
    const resultDelete = await knexConnection.raw(`
      DELETE FROM games WHERE id = ${id}
    `);

    return resultDelete;
  }
  static async getById(id: number) {
    const list = await knexConnection.raw(`
      SELECT * FROM games WHERE id = ${id}
    `);
    const entities = list.rows as Array<{
      id: number;
      name: string;
      id_publisher?: number;
      img_src: string;
    }>;
    const entityById = entities[0];
    if (!entityById) throw new Error("game não encontrado");
    return new Game(
      entityById.id,
      entityById.name,
      entityById.img_src,
      entityById.id_publisher
    );
  }
}
