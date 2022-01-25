export class LoginCredensials{
  id: number | undefined;
  name: string | undefined;
  password: string | undefined;


  constructor(name: string | undefined, password: string | undefined) {
    this.name = name;
    this.password = password;
    this.id = undefined;
  }
}

