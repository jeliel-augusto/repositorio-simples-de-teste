import { ItemCompra } from "../entities/ItemCompra";
import { CompraRepository } from "../repositories/CompraRepository";
import { AuthService } from "./AuthService";
import { ClientService } from "./ClientService";
import { GameService } from "./GameService";

export class CompraService {
  static async getCompraById(idCompra: number) {
    const compra = await CompraRepository.getCompraById(idCompra);
    return compra;
  }
  static async deleteCompra(idCompra: number) {
    await CompraRepository.getCompraById(idCompra);
    await CompraRepository.deleteCompra(idCompra);
  }

  static async buyGame(idCliente: number, itensCompra: ItemCompra[]) {
    await AuthService.getById(idCliente);
    await this.validateItensCompra(itensCompra);
    const result = await CompraRepository.buyGame(itensCompra, idCliente);
    return result;
  }
  static async updateBuyGame(itensCompra: ItemCompra[], idCompra: number) {
    await this.validateItensCompra(itensCompra);
    const result = await CompraRepository.updateBuyGame(itensCompra, idCompra);
    return result;
  }
  static async getComprasByClient(idCliente: number) {
    const result = await CompraRepository.getComprasByClient(idCliente);
    return result;
  }
  static async getItensCompraByGame(idGame: number) {
    const result = await CompraRepository.getItensComprasByGame(idGame);
    return result;
  }
  static async validateItensCompra(itens: ItemCompra[]) {
    for (const item of itens) {
      if (!(item.qtd > 0))
        throw new Error("Quantidade precisa ser maior que zero!");
      await GameService.getById(item.id_games);
      if (!(item.preco > 0))
        throw new Error("Preço precisa ser maior que zero!");
    }
  }
}
