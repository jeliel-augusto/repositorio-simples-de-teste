import { createContext } from "react";

export const HeaderContext = createContext({
  headerTitle: "Games",
  setHeaderTitle: (title: string) => {},
});
