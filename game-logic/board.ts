import { Player } from './player';
import { FullRegularDeck } from './fullRegularDeck';

export class Board {
    players: Array<Player>;
    //decks
    //cards-in-hand
    //cards-in-middle (active)

    constructor(player1: Player, player2: Player) {
        this.players = [];
        this.players.push(player1);
        this.players.push(player2);
    }
    start() {
        console.log('começo');
        //rs
    }
}