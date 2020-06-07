export class RegularCard {
  name: string;
  position: string;
  affiliations: string[];
  shinsoo: Number;
  int: Number;
  str: Number;
  speed: Number;

  constructor(name: string, position: string, affiliations: string[], 
    shinsoo: Number, int: Number, str: Number, speed: Number) {
    this.name = name;
    this.position = position;
    this.affiliations = affiliations;
    this.shinsoo = shinsoo;
    this.int = int;
    this.str = str;
    this.speed = speed;
  }
}
