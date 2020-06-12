import { RegularCard } from "../regularCard";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class PickRegularCard extends Schema {
  @type(RegularCard)
  regularCard: RegularCard
  @type("boolean")
  isActive: boolean;

  constructor(regularCard: RegularCard) {
    super();
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
