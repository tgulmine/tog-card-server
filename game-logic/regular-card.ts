import { Room, Client } from "colyseus";

export class RegularCard {
  name: string;
  position: string;
  affiliations: string[];
  shinsoo: Number;
  int: Number;
  speed: Number;
  str: Number;

  constructor(name: string, position: string, affiliations: string[], 
    shinsoo: Number, int: Number, speed: Number, str: Number) {
    this.name = name;
    this.position = position;
    this.affiliations = affiliations;
    this.shinsoo = shinsoo;
    this.int = int;
    this.speed = speed;
    this.str = str;
  }
}
