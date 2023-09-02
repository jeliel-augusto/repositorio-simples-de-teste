import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/button";
import { Dropdown } from "../../../components/dropdown";
import { Input } from "../../../components/input/input";
import { CrudDataProperty } from "../../../components/crud/search/CrudSearch";
import { PublisherAPI } from "../../../api/publisherAPI";
import { Game } from "../../../models/Game";
import { GamesAPI } from "../../../api/gamesAPI";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Link from "next/link";
import { HeaderContext } from "../../../context/HeaderContext";
import { ItemCompra } from "../../../models/ItemCompra";
import { MdDelete, MdEdit } from "react-icons/md";
import { Compra } from "../../../models/Compra";
import { useAuth } from "../../../hooks/useAuth";
import { CompraAPI } from "../../../api/compraAPI";
import { toast } from "react-toastify";

export default function AddCompraPage() {
  const router = useRouter();
  const { idUser } = useAuth();
  const [error, setError] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [itensCompra, setItensCompra] = useState<ItemCompra[]>([]);
  const [gameQuantity, setGameQuantity] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [gameSelectedToAdd, setGameSelectedToAdd] = useState("");
  const [gameOptions, setGameOptions] = useState<CrudDataProperty[]>([]);
  const [itemCompraIndexToEdit, setItemCompraIndexToEdit] = useState<number>();
  const onEditItemCompra = useCallback(
    async (itemCompra: ItemCompra, index: number) => {
      setGameSelectedToAdd(itemCompra.id_games.toString());
      setGameQuantity(itemCompra.qtd.toString());
      setGamePrice(itemCompra.preco.toString());
      setItemCompraIndexToEdit(index);
    },
    []
  );
  const onEditItemCompraClear = useCallback(() => {
    setGameSelectedToAdd(gameOptions[0].property);
    setGameQuantity("");
    setGamePrice("");
    setItemCompraIndexToEdit(undefined);
  }, [gameOptions]);
  const addOrEditItemCompra = useCallback(async () => {
    const gameFound = games.find(
      (value) => value.id.toString() === gameSelectedToAdd
    );
    if (gameFound && itemCompraIndexToEdit! >= 0) {
      const editedItemCompra = new ItemCompra(
        0,
        +gameSelectedToAdd,
        +gameQuantity,
        +gameQuantity * gameFound.price
      );
      editedItemCompra.game = gameFound;
      setItensCompra((prev) => {
        const copy = prev.slice();
        copy[itemCompraIndexToEdit!] = editedItemCompra;
        return copy;
      });
      onEditItemCompraClear();
      return;
    }
    if (gameFound) {
      const gameExistentIndex = itensCompra.findIndex(
        (itemCompra) => itemCompra.id_games === gameFound.id
      );
      const gameExists = itensCompra[gameExistentIndex];
      if (gameExists) {
        const newEditedItemCompra = new ItemCompra(
          0,
          +gameSelectedToAdd,
          gameExists.qtd + +gameQuantity,
          +((gameExists.qtd + +gameQuantity) * gameFound.price).toFixed(2)
        );
        newEditedItemCompra.game = gameFound;
        setItensCompra((prev) => {
          const copy = prev.slice();
          copy[gameExistentIndex] = newEditedItemCompra;
          return copy;
        });
      } else {
        const newItemCompra = new ItemCompra(
          0,
          +gameSelectedToAdd,
          +gameQuantity,
          +(+gameQuantity * gameFound.price).toFixed(2)
        );
        newItemCompra.game = gameFound;
        setItensCompra((prev) => {
          return [...prev, newItemCompra];
        });
      }
    }
  }, [
    gameSelectedToAdd,
    games,
    gameQuantity,
    itemCompraIndexToEdit,
    onEditItemCompraClear,
    itensCompra,
  ]);
  const removeItem = useCallback(
    async (index: number) => {
      const itemCompraFound = itensCompra[index];
      if (itemCompraFound) {
        setItensCompra((prev) => {
          const copy = prev.slice();
          copy.splice(index, 1);
          return copy;
        });
      }
    },
    [itensCompra]
  );
  const fetchGames = useCallback(async () => {
    const games = await GamesAPI.getGames();
    setGames(games);
    const gameOptions = games.map((game) => ({
      property: game.id.toString(),
      name: game.name,
    }));
    setGameOptions(gameOptions);
    setGameSelectedToAdd(gameOptions[0].property);
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  useEffect(() => {
    const gameFound = games.find(
      (value) => value.id.toString() === gameSelectedToAdd
    );
    if (gameFound) {
      setGamePrice(gameFound.price.toString());
    }
  }, [gameSelectedToAdd, games]);
  const { setHeaderTitle } = useContext(HeaderContext);
  useEffect(() => {
    setHeaderTitle("Compras / Adicionar");
  }, [setHeaderTitle]);
  const onSubmit = useCallback(async () => {
    try {
      await CompraAPI.buyGame(itensCompra, idUser);
      toast("Compra realizada com sucesso.", {
        type: "success",
      });
      router.back();
    } catch (e) {
      console.error(e);
      setError(((e as AxiosError).response?.data as any)?.message);
    }
  }, [router, itensCompra, idUser]);

  return (
    <div className="w-full justify-center items-center h-full flex">
      <div className="flex flex-col items-center justify-center h-full w-1/2">
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <Dropdown
              label="Selecione um game"
              onChangeOption={(property) => {
                setGameSelectedToAdd(property);
              }}
              options={gameOptions}
              value={gameSelectedToAdd}
            />
          </div>
          <div className="w-1/3">
            <Input
              label="Quantidade"
              type="number"
              onChange={(e) => {
                setGameQuantity(e);
              }}
              value={gameQuantity}
            />
          </div>
          <div className="w-1/3">
            <Input
              label="Preço"
              type="number"
              onChange={(e) => {
                // setGamePrice(e);
              }}
              value={gamePrice}
            />
          </div>
        </div>
        <div className="flex mt-4">
          <Button
            className="mr-2"
            onClick={addOrEditItemCompra}
            disabled={
              !gameSelectedToAdd || !gameQuantity || isNaN(+gameQuantity)
            }
          >
            {itemCompraIndexToEdit! >= 0 ? "Editar" : "Adicionar"} Game
          </Button>
          {itemCompraIndexToEdit! >= 0 && (
            <Button className="bg-red-400" onClick={onEditItemCompraClear}>
              Cancelar Edição
            </Button>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <ul className="flex flex-1 flex-col">
            {itensCompra.map((itemCompra, index) => (
              <div
                className="flex-1 flex justify-between gap-4 border p-3 my-1 border-slate-500"
                key={index}
              >
                <p>Nome: {itemCompra.game!.name}</p>
                <p>Quantidade: {itemCompra.qtd}</p>
                <p>Preço: R$ {itemCompra.preco}</p>
                <button
                  className=" text-orange-400"
                  onClick={() => onEditItemCompra(itemCompra, index)}
                >
                  <MdEdit />
                </button>
                <button
                  className=" text-red-500"
                  onClick={() => removeItem(index)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </ul>
        </div>
        {error !== "" && (
          <span className="flex text-red-500 my-3">
            Ops! Ocorreu um erro: {error}
          </span>
        )}
        <div className="flex mt-4">
          <Button
            className="mr-2"
            onClick={() => onSubmit()}
            disabled={itensCompra.length === 0}
          >
            Realizar Compra
          </Button>
          <Link href={"/compras/"}>
            <Button className="bg-red-400">Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
