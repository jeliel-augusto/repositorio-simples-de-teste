import { Publisher } from "./Publisher";

export class Game {
  id!: number;
  name!: string;
  id_publisher?: number;
  publisher!: Publisher;
  img_src!: string;
  price!: number;
}
