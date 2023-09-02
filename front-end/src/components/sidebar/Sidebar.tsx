import { useCallback, useContext, useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { AuthAPI } from "../../api/authAPI";
import { useRouter } from "next/router";
export const Sidebar = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const logout = useCallback(async () => {
    try {
      await AuthAPI.logout();
      setIsAuthenticated(false);
      router.replace("/auth/sign-in");
    } catch (e) {
      console.error(e);
      toast("falha ao sair, tente novamente", { type: "error" });
    }
  }, [setIsAuthenticated, router]);
  if (!isAuthenticated) return <></>;
  return (
    <section
      className={`bg-main-black min-h-screen h-full ${
        expanded ? "w-[300px]" : "w-[80px]"
      } flex text-white relative justify-center items-start`}
    >
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="absolute bg-orange-400 left-[100%] translate-x-[-50%] top-[16px] text-2xl rounded-full"
      >
        {expanded ? <MdChevronLeft /> : <MdChevronRight />}
      </button>
      <div className="flex flex-1 flex-col h-full gap-3 ">
        <button
          className="text-white text-xs"
          onClick={() => router.push("/games")}
        >
          Games
        </button>
        <button
          className="text-white text-xs"
          onClick={() => router.push("/compras")}
        >
          Compras
        </button>
        <button className="text-white text-xs" onClick={logout}>
          Sair
        </button>
      </div>
    </section>
  );
};
