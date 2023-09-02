import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  nookies.destroy({ res }, "token", {
    sameSite: "none",
    path: "/",
    secure: true,
  });
  res.status(200).json({ message: "ok" });
}
