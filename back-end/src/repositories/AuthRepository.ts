import { config } from "dotenv";
import { User } from "../entities/User";
import { knexConnection } from "../db/db";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
config();
const JWT_SECRET = process.env.JWT_SECRET;
export class AuthRepository {
  static async createUser(user: User) {
    const hashPassword = await hash(user.passwordHash, 12);
    const userExistents = await knexConnection.raw(`
      SELECT * FROM "user" WHERE email = '${user.email}'
    `);
    const entities = userExistents.rows as Array<{
      id: number;
      email: string;
      name: string;
      passwordHash: string;
      profilePicSrc: string;
    }>;
    if (entities[0]) throw new Error("Email já existe");
    const resultInsert = await knexConnection.raw(`
        INSERT INTO "user" (name, email, "passwordHash", "profilePicSrc") 
        VALUES('${user.name}', '${user.email}', '${hashPassword}', '${user.profilePicSrc}')
        RETURNING ID
    `);
    const idEntity = resultInsert.rows[0].id;
    return this.getById(idEntity);
  }
  static async getById(id: number) {
    const list = await knexConnection.raw(`
      SELECT * FROM "user" WHERE id = ${id}
    `);
    const entities = list.rows as Array<{
      id: number;
      email: string;
      name: string;
      passwordHash: string;
      profilePicSrc: string;
    }>;
    const entityById = entities[0];
    if (!entityById) throw new Error("Usuário não encontrado");
    return new User(
      entityById.id,
      entityById.email,
      entityById.passwordHash,
      entityById.name,
      entityById.profilePicSrc
    );
  }
  static async login(email: string, password: string) {
    const list = await knexConnection.raw(`
        SELECT * FROM "user" WHERE email = '${email}' LIMIT 1;
    `);
    const entities = list.rows as Array<{
      id: number;
      email: string;
      name: string;
      passwordHash: string;
      profilePicSrc: string;
    }>;
    if (entities[0]) {
      const result = await compare(password, entities[0].passwordHash);
      if (!result) throw new Error("senha inválida.");
      return new User(
        entities[0].id,
        entities[0].email,
        entities[0].passwordHash,
        entities[0].name,
        entities[0].profilePicSrc
      );
    } else {
      return null;
    }
  }
  static createLoginToken(user: User) {
    return jwt.sign({ ...user }, JWT_SECRET!, {
      expiresIn: "72h",
    });
  }
  static verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET!);
  }
}
