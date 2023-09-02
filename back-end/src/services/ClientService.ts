import { ClientRepository } from "../repositories/ClientRepository";

export class ClientService {
  static async list() {
    return await ClientRepository.getAllClients();
  }
  static async save(client: any) {
    await this.validateClient(client, true);
    const clientSaved = await ClientRepository.save(client);
    return clientSaved;
  }
  static async getById(id: number) {
    return await ClientRepository.getById(id);
  }
  static async update(id: number, clientToUpdate: any) {
    await ClientRepository.getById(id);
    await this.validateClient(clientToUpdate);
    const clientUpdated = await ClientRepository.update(id, clientToUpdate);
    return clientUpdated;
  }
  static async delete(id: number) {
    await ClientRepository.getById(id);
    const clientDeleted = await ClientRepository.delete(id);
    return clientDeleted;
  }
  static async validateClient(client: any, uniqueEmail = false) {
    if (!client.name) throw new Error("Nome é obrigatório");
    if (!client.email) throw new Error("Email é obrigatório");
    if (!client.senha) throw new Error("Senha é obrigatório");
    const clientExist = await ClientRepository.getByEmail(client.email);
    if (uniqueEmail && clientExist !== null) {
      throw new Error("Email já existe");
    }
  }
}
