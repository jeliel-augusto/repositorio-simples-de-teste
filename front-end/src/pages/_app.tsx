import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Layout } from "../components/layout";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
