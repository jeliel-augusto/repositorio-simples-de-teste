import { useCallback, useContext, useState } from "react";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { AuthAPI } from "../../api/authAPI";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const SignInPage = () => {
  const [email, setEmail] = useState<string>();
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [password, setPassword] = useState<string>();
  const onSubmit = useCallback(async () => {
    try {
      await AuthAPI.login(email!, password!);
      router.push(`/compras`);
      setIsAuthenticated(true);
    } catch (e) {
      console.error(e);
      toast("Erro ao realizar login: ", { type: "error" });
    }
  }, [email, password]);
  return (
    <div className="h-full flex-col flex justify-center items-center">
      <div className="flex flex-col  h-1/2 w-1/2 shadow-lg rounded-lg items-center bg-slate-200 justify-center">
        <img src="/images/logo.png" className="w-[60px] rounded-full"></img>

        <h1>Login Awesome Games FrontEnd</h1>

        <div className="px-9 w-full">
          <Input
            value={email}
            onChange={(text) => setEmail(text)}
            label="Email"
          />
        </div>

        <div className="px-9 w-full my-1">
          <Input
            value={password}
            onChange={(text) => setPassword(text)}
            label="Senha"
            type="password"
          />
        </div>
        <Button
          className="mt-5 w-[120px]"
          disabled={!email || !password}
          onClick={onSubmit}
        >
          Entrar
        </Button>
        <Link href="/auth/sign-up">
          <span className="text-blue-400 my-3 pb-3 flex">
            Não possui conta? Clique aqui.
          </span>
        </Link>
      </div>
    </div>
  );
};
export default SignInPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  if (token) {
    return {
      redirect: {
        destination: "/compras",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
