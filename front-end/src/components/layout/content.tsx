import { PropsWithChildren } from "react";

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="flex flex-1 ">{children}</main>;
};
