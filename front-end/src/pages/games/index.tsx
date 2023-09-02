import { useCallback, useEffect, useState } from "react";
import { Game } from "../../models/Game";
import { GamesAPI } from "../../api/gamesAPI";
import { Table } from "../../components/crud/table/table";
import { TableRowsData } from "../../components/crud/table/row";
import {
  CrudDataProperty,
  CrudSearch,
} from "../../components/crud/search/CrudSearch";
import { Button } from "../../components/button";
import Link from "next/link";
import { ConfirmDelete } from "../../components/dialogs/ConfirmDelete";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
const columns = ["ID", "Nome", "Publicadora", "Imagem", "Ação"];
const fieldsToSearch: CrudDataProperty[] = [
  {
    name: "ID",
    property: "id",
  },
  {
    name: "Nome",
    property: "name",
  },
  {
    name: "Publicadora",
    property: "publisher",
  },
];
export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [gamesTableRowsData, setGamesTableRowsData] = useState<TableRowsData>(
    []
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const onEdit = useCallback(async () => {}, []);
  const onDelete = useCallback(async (id: string) => {
    setIdToDelete(+id);
    setShowConfirmDelete(true);
  }, []);

  const fetchGames = useCallback(async () => {
    try {
      const listOfGames = await GamesAPI.getGames();
      setGames(listOfGames);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const onConfirmDelete = useCallback(async () => {
    try {
      await GamesAPI.delete(idToDelete);
      toast("Game deletado com sucesso.", {
        type: "success",
      });
    } catch (e) {
      const error = ((e as AxiosError).response?.data as any)?.message;
      if (error) {
        toast("Game falhou ao deletar. Erro: " + error, {
          type: "error",
        });
      }
    }
    setShowConfirmDelete(false);
    fetchGames();
  }, [fetchGames, idToDelete]);

  const searchGames = useCallback(
    async (field: string, value: string) => {
      if (value.length === 0) return fetchGames();
      try {
        const listOfGames = await GamesAPI.searchGamesByField(field, value);
        setGames(listOfGames);
      } catch (e) {
        console.error(e);
      }
    },
    [fetchGames]
  );

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  useEffect(() => {
    const tableRowsData: TableRowsData = [];
    console.log(games);
    for (const game of games) {
      tableRowsData.push({
        id: game.id.toString(),
        cells: [
          {
            data: game.id.toString(),
            type: "string",
            size: 1,
          },
          {
            data: game.name,
            type: "string",
            size: 4,
          },
          {
            data: game.publisher.name,
            type: "string",
            size: 4,
          },
          {
            data: game.img_src,
            type: "img",
            size: 2,
          },
        ],
      });
    }
    setGamesTableRowsData(tableRowsData);
  }, [games]);
  return (
    <div className="w-full">
      <CrudSearch fieldsToSearch={fieldsToSearch} onSearch={searchGames} />
      <ConfirmDelete
        isOpen={showConfirmDelete}
        closeModal={() => setShowConfirmDelete(false)}
        onYes={onConfirmDelete}
      />
      <Table
        columns={columns}
        onDelete={onDelete}
        onEdit={onEdit}
        rows={gamesTableRowsData}
      />
      <div className="flex justify-end flex-1 my-4">
        <Link href={"/games/add"}>
          <Button className="mr-1">Novo</Button>
        </Link>

        <Button onClick={() => {}} className="mr-1">
          Cancelar
        </Button>
      </div>
    </div>
  );
}
