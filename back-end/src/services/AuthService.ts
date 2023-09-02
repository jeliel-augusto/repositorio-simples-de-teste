import { User } from "../entities/User";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthService {
  static async getById(id: any) {
    return await AuthRepository.getById(id);
  }
  static async createUser(user: User) {
    return await AuthRepository.createUser(user);
  }
  static async login(email: string, password: string) {
    const user = await AuthRepository.login(email, password);
    if (!user) throw new Error("Usuário não encontrado.");
    return AuthRepository.createLoginToken(user);
  }
  static async createTokenFromUser(user: User) {
    return AuthRepository.createLoginToken(user);
  }
  static async verifyToken(token: string) {
    return AuthRepository.verifyToken(token);
  }
  static validateUser(user: User) {
    if (!user.email) throw new Error("Email não informado.");
    if (!user.name) throw new Error("Nome não informado.");
    if (!user.passwordHash) throw new Error("Senha não informada.");
    if (!user.profilePicSrc) user.profilePicSrc = "";
  }
}
