import { useCallback, useEffect, useMemo, useState } from "react";
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

export default function AddGamePage() {
  const router = useRouter();
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
  const createNewGame = useCallback(async () => {
    const game = new Game();
    game.name = gameName;
    game.img_src = gameImage;
    game.id_publisher = parseInt(gamePublisher);
    try {
      await GamesAPI.create(game);
      router.back();
    } catch (e) {
      console.error(e);
      setError(((e as AxiosError).response?.data as any)?.message);
    }
  }, [gameName, gameImage, gamePublisher, router]);
  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);
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
            onClick={createNewGame}
            disabled={isFormInvalid}
          >
            Cadastrar
          </Button>
          <Link href={"/games/"}>
            <Button className="bg-red-400">Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
