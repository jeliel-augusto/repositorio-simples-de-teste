import { Compra } from "../models/Compra";
import { Game } from "../models/Game";
import axios from "axios";
import { ItemCompra } from "../models/ItemCompra";
export class CompraAPI {
  static async getCompras(): Promise<Compra[]> {
    const request = await axios.get<Compra[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/client/purchases`,
      {
        withCredentials: true,
      }
    );
    return request.data;
  }
  static async buyGame(
    itensCompra: ItemCompra[],
    idUser: number
  ): Promise<Compra> {
    const request = await axios.post<Compra>(
      `${process.env.NEXT_PUBLIC_API_URL}/client/buy`,
      itensCompra,
      {
        withCredentials: true,
      }
    );
    return request.data;
  }
  static async delete(id: number): Promise<void> {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/client/purchases/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  static async getById(id: number) {
    const request = await axios.get<Compra>(
      `${process.env.NEXT_PUBLIC_API_URL}/client/purchases/${id}`,
      {
        withCredentials: true,
      }
    );
    return request.data;
  }
  static async update(id: number, itensCompra: ItemCompra[]): Promise<Compra> {
    const request = await axios.put<Compra>(
      `${process.env.NEXT_PUBLIC_API_URL}/client/purchases/${id}`,
      itensCompra,
      {
        withCredentials: true,
      }
    );
    return request.data;
  }
}
