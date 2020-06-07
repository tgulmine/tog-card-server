import { Player } from './player';
import { FullRegularDeck } from './fullRegularDeck';

export class Board {
    players: Array<Player>;
    //decks
    //cards-in-hand
    //cards-in-middle (active)

    constructor() {
        this.players = [];
    }
    start(playerOneName: string, playerTwoName: string) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        let deck = new FullRegularDeck();
        deck.createDeck();
        deck.shuffleDeck();    
        //picking phase
    }
}