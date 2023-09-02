import { ItemCompra } from "./ItemCompra";

export class Compra {
  id: number;
  id_cliente: number;
  dthr: Date;
  itensCompra?: ItemCompra[];
  constructor(id: number, id_cliente: number, dthr: Date) {
    this.id = id;
    this.id_cliente = id_cliente;
    this.dthr = dthr;
  }
}
