import { Game } from "./Game";

export class ItemCompra {
  id_compra: number;
  id_games: number;
  qtd: number;
  preco: number;
  game?: Game;
  constructor(id_compra: number, id_games: number, qtd: number, preco: number) {
    this.id_compra = id_compra;
    this.id_games = id_games;
    this.qtd = qtd;
    this.preco = preco;
  }
}
