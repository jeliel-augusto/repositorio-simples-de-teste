import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Link from "next/link";
import { Button } from "../../../components/button";
import { GamesAPI } from "../../../api/gamesAPI";
import { PublisherAPI } from "../../../api/publisherAPI";
import { CrudDataProperty } from "../../../components/crud/search/CrudSearch";
import { Dropdown } from "../../../components/dropdown";
import { Game } from "../../../models/Game";
import { Input } from "../../../components/input/input";

export default function EditGamePage() {
  const router = useRouter();
  const id: string = router.query.id as string;
  const [error, setError] = useState("");
  const [gameName, setGameName] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [gamePublisher, setGamePublisher] = useState("");
  const [publisherOptions, setPublisherOptions] = useState<CrudDataProperty[]>(
    []
  );
  const isFormInvalid = useMemo(() => {
    return !gameName || !gameImage || !gamePublisher;
  }, [gameName, gameImage, gamePublisher]);
  const fetchPublishers = useCallback(async () => {
    const publishers = await PublisherAPI.getPublishers();
    const publisherOptions = publishers.map((publisher) => ({
      property: publisher.id.toString(),
      name: publisher.name,
    }));
    setPublisherOptions(publisherOptions);
    setGamePublisher(publisherOptions[0].property);
  }, []);
  const updateGame = useCallback(async () => {
    const game = new Game();
    game.id = +id;
    game.name = gameName;
    game.img_src = gameImage;
    game.id_publisher = parseInt(gamePublisher);
    try {
      await GamesAPI.update(+id, game);
      router.back();
    } catch (e) {
      console.error(e);
      setError(((e as AxiosError).response?.data as any)?.message);
    }
  }, [gameName, gameImage, id, gamePublisher, router]);
  const getById = useCallback(async () => {
    if (!isNaN(+id)) {
      const gameToUpdate = await GamesAPI.getById(+id);
      setGameName(gameToUpdate.name);
      setGameImage(gameToUpdate.img_src);
      if (
        gameToUpdate.id_publisher !== undefined &&
        gameToUpdate.id_publisher > 0
      ) {
        setGamePublisher(gameToUpdate.id_publisher?.toString());
      }
    }
  }, [id]);
  useEffect(() => {
    async function init() {
      await fetchPublishers();
      await getById();
    }
    init();
  }, [fetchPublishers, getById]);
  return (
    <div className="w-full justify-center items-center h-full flex">
      <div className="flex flex-col items-center justify-center h-full w-1/2">
        <div className="w-full">
          <Input
            label="Nome"
            onChange={(e) => {
              setGameName(e);
            }}
            value={gameName}
          />
        </div>
        <div className="w-full">
          <Input
            label="Caminho da imagem"
            onChange={(e) => {
              setGameImage(e);
            }}
            value={gameImage}
          />
        </div>
        <div className="w-full">
          <Dropdown
            value={gamePublisher}
            label="Publicadora"
            onChangeOption={(property) => {
              setGamePublisher(property);
            }}
            options={publisherOptions}
          />
        </div>
        {error !== "" && (
          <span className="flex text-red-500 my-3">
            Ops! Ocorreu um erro: {error}
          </span>
        )}
        <div className="flex mt-4">
          <Button
            className="mr-2"
            onClick={updateGame}
            disabled={isFormInvalid}
          >
            Atualizar
          </Button>
          <Link href={"/games/"}>
            <Button className="bg-red-400">Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
