import { RegularCard } from "../regularCard";

export class PickRegularCard extends RegularCard {
  isActive: boolean;

  constructor(name: string, position: string, affiliations: string[], 
    shinsoo: Number, int: Number, str: Number, speed: Number) {
    super(name, position, affiliations, 
      shinsoo, int, str, speed);
    this.isActive = false;
  }

  onClick() {
    this.isActive = !this.isActive;
  }

}
