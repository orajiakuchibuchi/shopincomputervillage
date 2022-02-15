export class Privilege {
  public name: String;
  public id: Number;
  public description: String;

  constructor(id: Number, name: String, description: String){
    this.id = id;
    this.name = name;
    this.description = description;
  }
  toString(): String {
    return this.name.replace(/_/g, " ");
  }
}
