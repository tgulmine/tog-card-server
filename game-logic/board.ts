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
        let d = new FullRegularDeck();
        d.createDeck();
        d.shuffleDeck();    
        //picking phase
        //split deck
        this.players[0].playerCards = d.deck.slice(0,14);
        this.players[1].playerCards = d.deck.slice(15,29);
    }
}