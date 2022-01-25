export class AccountTo{
  public id: number | undefined;
  public name: string | undefined;
  public type: string | undefined;
  public currentValue: number | undefined;

  constructor( name: string | undefined, type: string | undefined) {
    this.id = undefined;
    this.name = name;
    this.type = type;
    this.currentValue = 0;
  }


}
