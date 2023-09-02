import { Knex } from "knex";
import { knexConnection } from "../db/db";
import { Compra } from "../entities/Compra";
import { ItemCompra } from "../entities/ItemCompra";
import { GameService } from "../services/GameService";

export class CompraRepository {
  static async updateBuyGame(itensCompra: ItemCompra[], idCompra: number) {
    await knexConnection.transaction(async (scope) => {
      try {
        await scope.raw(
          `DELETE FROM item_compra WHERE id_compra = ${idCompra}`
        );
        await CompraRepository.insertIntoCompra(itensCompra, scope, idCompra);
      } catch (e) {
        // error = e as Error;
        console.error(e);
        scope.rollback();
      }
    });
    return await this.getCompraById(idCompra);
  }
  static async buyGame(itensCompra: ItemCompra[], idCliente: number) {
    let idCompraResult: number | null = null;
    // let error: Error | null = null;
    await knexConnection.transaction(async (scope) => {
      try {
        const resultInsertCompra = await scope.raw(`
                INSERT INTO compra (id_cliente)
                VALUES (${idCliente})
                RETURNING ID
            `);
        const idCompra = resultInsertCompra.rows[0].id;
        await CompraRepository.insertIntoCompra(itensCompra, scope, idCompra);
        idCompraResult = idCompra;
      } catch (e) {
        // error = e as Error;
        console.error(e);
        scope.rollback();
      }
    });
    if (idCompraResult === null)
      throw new Error(`Ocorreu um erro ao realizar compra`);
    // if(idCompraResult === null) throw error
    return await this.getCompraById(idCompraResult);
  }
  private static async insertIntoCompra(
    itensCompra: ItemCompra[],
    scope: Knex.Transaction,
    idCompra: any
  ) {
    for (const item of itensCompra) {
      await scope.raw(`
                    INSERT INTO item_compra (id_compra, id_games, qtd, preco)
                    VALUES (${idCompra}, ${item.id_games}, ${item.qtd}, ${item.preco})
                   
                `);
    }
  }

  static async getItensComprasByGame(idGame: number) {
    const itensCompra = await knexConnection.raw(`
      SELECT * FROM item_compra WHERE id_games = ${idGame}
    `);
    const entitiesItensCompras = itensCompra.rows as Array<ItemCompra>;
    return entitiesItensCompras.map(
      (value) =>
        new ItemCompra(value.id_compra, value.id_games, value.qtd, value.preco)
    );
  }
  static async getComprasByClient(idClient: number) {
    const compras = await knexConnection.raw(`
      SELECT * FROM compra WHERE id_cliente = ${idClient}
      ORDER BY dthr
    `);
    const entitiesCompras = compras.rows as Array<{
      id: number;
      id_cliente: number;
      dthr: string;
    }>;
    const results: Compra[] = [];
    for (const entity of entitiesCompras) {
      const compra = new Compra(
        entity.id,
        entity.id_cliente,
        new Date(entity.dthr)
      );
      await CompraRepository.getItensCompraFromCompra(entity.id, compra);
      results.push(compra);
    }
    return results;
  }
  static async getCompraById(idCompra: number) {
    const compras = await knexConnection.raw(`
      SELECT * FROM compra WHERE id = ${idCompra}
    `);
    const entityCompra = compras.rows[0] as {
      id: number;
      id_cliente: number;
      dthr: string;
    };
    const compra = new Compra(
      entityCompra.id,
      entityCompra.id_cliente,
      new Date(entityCompra.dthr)
    );
    await this.getItensCompraFromCompra(entityCompra.id, compra);
    return compra;
  }
  private static async getItensCompraFromCompra(
    idCompra: number,
    compra: Compra
  ) {
    const itens = await knexConnection.raw(`
        SELECT * FROM item_compra WHERE id_compra = ${idCompra}
      `);
    const entitiesItens = itens.rows as Array<{
      id_compra: number;
      id_games: number;
      qtd: number;
      preco: number;
    }>;
    compra.itensCompra = await Promise.all(
      entitiesItens.map(async (value) => {
        const itemCompra = new ItemCompra(
          idCompra,
          value.id_games,
          value.qtd,
          value.preco
        );
        itemCompra.game = await GameService.getById(itemCompra.id_games);
        return itemCompra;
      })
    );
    return itens;
  }
  static async deleteCompra(idCompra: number) {
    await knexConnection.transaction(async (scope) => {
      try {
        await scope.raw(`
          DELETE FROM item_compra WHERE id_compra = ${idCompra}
        `);
        await scope.raw(`
          DELETE FROM compra WHERE id = ${idCompra}
        `);
      } catch (e) {
        // error = e as Error;
        console.error(e);
        scope.rollback();
      }
    });
  }
}
