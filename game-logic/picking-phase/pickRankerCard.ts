import { RankerCard } from "../rankerCard";

export class PickRankerCard {
  rankerCard: RankerCard;
  isActive: boolean;

  constructor(rankerCard: RankerCard) {
    this.rankerCard = rankerCard;
    this.isActive = false;
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  toString() {
    return this.rankerCard.name;
  }

}
