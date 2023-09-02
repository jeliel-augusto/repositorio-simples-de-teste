export class Client {
  id?: number;
  name?: string;
  email?: string;
  senha?: string;
  constructor(id: number, name: string, email: string, senha: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.senha = senha;
  }
}
