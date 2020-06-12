import { Player } from './player';
import { FullRegularDeck } from './fullRegularDeck';
import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class Board extends Schema {
    @type([Player])
    players: ArraySchema<Player>;
    //decks
    //cards-in-hand
    //cards-in-middle (active)

    constructor(player1: Player, player2: Player) {
        super();
        this.players = new ArraySchema<Player>();
        this.players.push(player1);
        this.players.push(player2);
    }
    start() {
        console.log('começo');
        //rs
    }
}