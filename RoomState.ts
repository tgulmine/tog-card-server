import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class RoomState extends Schema {

  @type("number")
  x: number = 0.11;

  @type("number")
  y: number = 2.22;

}
