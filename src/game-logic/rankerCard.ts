import { Schema, MapSchema, type } from "@colyseus/schema";

export class RankerCard extends Schema {
  @type("string")
  name: string;
  
  @type("string")
  skill: string;
  
  @type("string")
  description: string;
  
  @type("number")
  cooldown: number;

  constructor(name: string, skill: string, description: string, cooldown: number) {
    super();
    this.name = name;
    this.skill = skill;
    this.description = description;
    this.cooldown = cooldown;
  }
}
