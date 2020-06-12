import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";
import { PickBoard } from '../game-logic/picking-phase/pickBoard';

export class GameState extends Schema {
  @type(PickBoard)
  pickBoard: PickBoard;

  /* @type({ map: Player })
  players = new MapSchema<Player>(); */

  constructor() {
    super();
    this.pickBoard = new PickBoard();
  }

}
