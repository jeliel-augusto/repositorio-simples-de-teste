import { Publisher } from "../entities/Publisher";
import { PublisherRepository } from "../repositories/PublisherRepository";

export class PublisherService {
  static async list() {
    return await PublisherRepository.getAllPublishers();
  }
  static async save(publisher: any) {
    this.validatePublisher(publisher);
    const publisherSaved = await PublisherRepository.save(publisher);
    return publisherSaved;
  }
  static async update(id: number, publisherUpdated: any) {
    await PublisherRepository.getById(id);
    this.validatePublisher(publisherUpdated);
    const publisher = await PublisherRepository.update(id, publisherUpdated);
    return publisher;
  }
  static async delete(id: number) {
    await PublisherRepository.getById(id);
    const deleteResult = await PublisherRepository.delete(id);
    return deleteResult;
  }

  static async getPublisherById(id: number) {
    return await PublisherRepository.getById(id);
  }

  static validatePublisher(publisher: Publisher) {
    if (!publisher.name) throw new Error("Publicadora precisa de um nome!");
    if (publisher.name.length > 200)
      throw new Error("Nome da publicadora inválido!");
  }
}
