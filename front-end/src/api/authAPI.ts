import axios from "axios";
import { User } from "../models/User";

export class AuthAPI {
  static async create(
    email: string,
    password: string,
    profilePicSrc: string,
    name: string
  ) {
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        email,
        passwordHash: password,
        profilePicSrc,
        name,
      },
      {
        withCredentials: true,
        // credentials: "include",
      }
    );
  }
  static async getById() {
    const request = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/info`,

      {
        withCredentials: true,
        // credentials: "include",
      }
    );
    return request.data;
  }
  static async login(email: string, password: string) {
    await axios.post(
      `/api/login`,
      { email, password },
      {
        withCredentials: true,
        // credentials: "include",
      }
    );
    const request = await axios.post(
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
    return request.data;
  }
  static async logout() {
    await axios.post(
      `/api/logout`,
      {},
      {
        withCredentials: true,
        // credentials: "include",
      }
    );
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        // credentials: "include",
      }
    );
    return request.data;
  }
}
