import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class RegularCard extends Schema {
  @type("string")
  name: string;
  
  @type("string")
  position: string;

  @type(["string"])
  affiliations: ArraySchema<string>;

  @type("number")
  shinsoo: number;

  @type("number")
  int: number;

  @type("number")
  str: number;

  @type("number")
  speed: number;

  constructor(name: string, position: string, affiliations: ArraySchema<string>, 
    shinsoo: number, int: number, str: number, speed: number) {
      super();
    this.name = name;
    this.position = position;
    
    this.affiliations = new ArraySchema<string>();
    affiliations.forEach(af => {
      this.affiliations.push(af);
    });

    this.shinsoo = shinsoo;
    this.int = int;
    this.str = str;
    this.speed = speed;
  }
}
