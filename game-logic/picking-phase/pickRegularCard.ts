import { RegularCard } from "../regularCard";

export class PickRegularCard {
  regularCard: RegularCard
  isActive: boolean;

  constructor(regularCard: RegularCard) {
    this.regularCard = regularCard;
    this.isActive = false;
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  toString() {
    return this.regularCard.name;
  }

}
