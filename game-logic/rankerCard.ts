export class RankerCard {
  name: string;
  skill: string;
  description: string;
  cooldown: number;

  constructor(name: string, skill: string, description: string, cooldown: number) {
    this.name = name;
    this.skill = skill;
    this.description = description;
    this.cooldown = cooldown;
  }
}
