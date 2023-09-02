import { knexConnection } from "../db/db";
import { Client } from "../entities/Client";

export class ClientRepository {
  static async save(client: Client) {
    const resultInsert = await knexConnection.raw(`
            INSERT INTO client(name, email, senha) 
            VALUES('${client.name}', '${client.email}', '${client.senha}')
        `);
    const idEntity = resultInsert[0].insertId;

    return this.getById(idEntity);
  }

  static async getAllClients() {
    const list = await knexConnection.raw(`
      SELECT * FROM client
    `);
    const entities = list[0] as Array<{
      id: number;
      name: string;
      email: string;
      senha: string;
    }>;
    const clients = entities.map(
      (entity) => new Client(entity.id, entity.name, entity.email, entity.senha)
    );
    return clients;
  }
  static async update(id: number, clientUpdated: Client) {
    const resultUpdate = await knexConnection.raw(`
        UPDATE client SET name = '${clientUpdated.name}', 
                          email = '${clientUpdated.email}'
        WHERE id = ${id}
    `);
    return this.getById(id);
  }
  static async delete(id: number) {
    const resultDelete = await knexConnection.raw(`
      DELETE FROM client WHERE id = ${id}
    `);
    return resultDelete;
  }
  static async getById(id: number) {
    const list = await knexConnection.raw(`
      SELECT * FROM client WHERE id = ${id}
    `);
    const entities = list[0] as Array<{
      id: number;
      name: string;
      email: string;
      senha: string;
    }>;
    const entityById = entities[0];
    if (!entityById) throw new Error("Cliente não encontrado");
    return new Client(
      entityById.id,
      entityById.name,
      entityById.email,
      entityById.senha
    );
  }
  static async getByEmail(email: string) {
    const list = await knexConnection.raw(`
      SELECT * FROM client WHERE email = '${email}'
    `);
    const entities = list[0] as Array<{
      id: number;
      name: string;
      email: string;
      senha: string;
    }>;
    const entityById = entities[0];
    if (!entityById) return null;
    return new Client(
      entityById.id,
      entityById.name,
      entityById.email,
      entityById.senha
    );
  }
}
