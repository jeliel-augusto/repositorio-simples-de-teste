export class User {
  id!: number;
  email!: string;
  name!: string;
  passwordHash!: string;
  profilePicSrc!: string;
  constructor(
    id: number,
    email: string,
    passwordHash: string,
    name: string,
    profilePicSrc: string
  ) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.name = name;
    this.profilePicSrc = profilePicSrc;
  }
}
/** explicação sobre hashs
 * senha123
 *
 * função hash: x -> abcd39fg
 *
 * hash(senha123) -> FF1332A...
 *
 * senha123 === senha123
 * FF1332A === hash(login) ?
 * --> se sim -> permite entrar
 * --> se não -> 401 não autorizado
 */
