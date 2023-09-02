import { Request, Response } from "express";
import { CompraService } from "../services/CompraService";

export class CompraController {
  static async updateBuyGames(request: Request, response: Response) {
    try {
      const idCompra = request.params.idCompra;
      const itensCompra = request.body;
      const result = await CompraService.updateBuyGame(itensCompra, +idCompra);
      response.status(200).json(result);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async list(request: Request, response: Response) {
    try {
      const idClient = request["user"].id;
      const list = await CompraService.getComprasByClient(+idClient);
      response.status(200).json(list);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async getById(request: Request, response: Response) {
    try {
      const idCompra = request.params.id;
      const compra = await CompraService.getCompraById(+idCompra);
      response.status(200).json(compra);
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async deleteCompra(request: Request, response: Response) {
    try {
      const idCompra = request.params.id;
      await CompraService.deleteCompra(+idCompra);
      response.status(204).send();
    } catch (e: any) {
      response.status(500).json({ message: e.message });
    }
  }
  static async buyGames(request: Request, response: Response) {
    try {
      const idClient = request["user"].id;
      const itensCompra = request.body;
      const result = await CompraService.buyGame(+idClient, itensCompra);
      response.status(200).json(result);
    } catch (e: any) {
      console.error(e);
      response.status(500).json({ message: e.message });
    }
  }
}
