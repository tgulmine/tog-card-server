export class RegularCard {
  name: string;
  position: string;
  affiliations: string[];
  shinsoo: number;
  int: number;
  str: number;
  speed: number;

  constructor(name: string, position: string, affiliations: string[], 
    shinsoo: number, int: number, str: number, speed: number) {
    this.name = name;
    this.position = position;
    this.affiliations = affiliations;
    this.shinsoo = shinsoo;
    this.int = int;
    this.str = str;
    this.speed = speed;
  }
}
