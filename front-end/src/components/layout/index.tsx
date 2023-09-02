import { PropsWithChildren, useState } from "react";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Content } from "./content";
import { HeaderContext } from "../../context/HeaderContext";
import { AuthContext } from "../../context/AuthContext";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("Games");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Header />
          <Content>
            <Sidebar />
            <div className="p-[16px] flex-1 flex-col">{children}</div>
          </Content>
        </AuthContext.Provider>
      </HeaderContext.Provider>
    </>
  );
};
