import { Game } from "../models/Game";
import axios from "axios";
export class GamesAPI {
  static async getGames(): Promise<Game[]> {
    const request = await axios.get<Game[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/games`
    );
    return request.data;
  }
  static async create(game: Game): Promise<Game> {
    const request = await axios.post<Game>(
      `${process.env.NEXT_PUBLIC_API_URL}/games`,
      game
    );
    return request.data;
  }
  static async delete(id: number): Promise<void> {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`);
  }
  static async getById(id: number) {
    const request = await axios.get<Game>(
      `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`
    );
    return request.data;
  }
  static async update(id: number, game: Game): Promise<Game> {
    const request = await axios.put<Game>(
      `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`,
      game
    );
    return request.data;
  }
  static async searchGamesByField(
    field: string,
    value: string
  ): Promise<Game[]> {
    const request = await axios.get<Game[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/games/search`,
      {
        params: {
          field,
          value,
        },
      }
    );
    return request.data;
  }
}
