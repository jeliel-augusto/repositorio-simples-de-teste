import { useState } from "react";

export const useAuth = () => {
  const [idUser, setIdUser] = useState(2);
  return { idUser };
};
