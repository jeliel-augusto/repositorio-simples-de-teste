import { useCallback, useContext, useState } from "react";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { AuthAPI } from "../../api/authAPI";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [profilePicSrc, setProfilePicSrc] = useState<string>();

  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const onSubmit = useCallback(async () => {
    try {
      await AuthAPI.create(email!, password!, profilePicSrc!, name!);
      router.push(`/compras`);
      setIsAuthenticated(true);
    } catch (e) {
      console.error(e);
      toast("Erro ao realizar login: ", { type: "error" });
    }
  }, [email, router, setIsAuthenticated, password, name, profilePicSrc]);
  return (
    <div className="h-full flex-col flex justify-center items-center">
      <div className="flex flex-col  w-1/2 shadow-lg rounded-lg items-center bg-slate-200 justify-center">
        <img src="/images/logo.png" className="w-[60px] rounded-full"></img>

        <h1>Cadastro Awesome Games FrontEnd</h1>

        <div className="px-9 w-full">
          <Input value={name} onChange={(text) => setName(text)} label="Nome" />
        </div>
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

        <div className="px-9 w-full my-1">
          <Input
            value={profilePicSrc}
            onChange={(text) => setProfilePicSrc(text)}
            label="URL foto de perfil"
          />
        </div>
        <Button
          className="mt-5 w-[120px]"
          disabled={!email || !password || !profilePicSrc || !name}
          onClick={onSubmit}
        >
          Cadastrar
        </Button>
        <Link href="/auth/sign-in">
          <span className="text-blue-400 my-3 pb-3 flex">
            Já possui conta? Clique aqui.
          </span>
        </Link>
      </div>
    </div>
  );
};
export default SignInPage;
