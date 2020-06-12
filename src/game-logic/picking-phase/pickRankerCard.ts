import { RankerCard } from "../rankerCard";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class PickRankerCard extends Schema {
  @type(RankerCard)
  rankerCard: RankerCard;
  @type("boolean")
  isActive: boolean;

  constructor(rankerCard: RankerCard) {
    super();
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
