// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        // credentials: "include",
      }
    );
    nookies.set(
      { res },
      "token",
      response.headers["set-cookie"]![0].split(";")[0].replace("token=", ""),
      {
        path: "/",
        maxAge: 3 * 24 * 60 * 60,
        sameSite: "none",
        secure: true,
      }
    );
    res.status(200).json({ message: "ok" });
  } catch (e) {
    const error = e as AxiosError;
    res.status(error.response!.status).json({ data: error.response!.data });
  }
}
