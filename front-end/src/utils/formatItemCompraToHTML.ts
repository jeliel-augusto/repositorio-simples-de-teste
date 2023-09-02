import { ItemCompra } from "../models/ItemCompra";

export const formatItemCompraToHTML = (itemCompra: ItemCompra) => {
  return `<div class="flex flex-row gap-1">
        <img class="rounded-full" src="${itemCompra.game?.img_src}" style="width: 50px;"/>
        <span>${itemCompra.game?.name}</span>
    </div>`;
};
