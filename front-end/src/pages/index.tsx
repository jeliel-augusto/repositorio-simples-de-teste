import Image from "next/image";
import { GameCard } from "../components/game/Game";
import { useEffect, useState } from "react";
import { Game } from "../models/Game";
import { GamesAPI } from "../api/gamesAPI";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // quando este componente for renderizado, faça
  }, []);

  return (
    <>
      <p>oi</p>
    </>
  );
}
// server-side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  if (!token) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
