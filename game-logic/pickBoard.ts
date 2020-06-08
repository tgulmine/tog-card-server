import { Player } from './player';
import { FullRegularDeck } from './fullRegularDeck';
import { FullRankerDeck } from './fullRankerDeck';
import { RegularCard } from './regularCard';

export class PickBoard {
    players: Array<Player>;
    regDeck: FullRegularDeck;
    rankDeck: FullRankerDeck;
    tempDeck: Array<Array<RegularCard>>;
    deckGroup: Array<Array<Array<RegularCard>>>;
    //decks
    //cards-in-hand
    //cards-in-middle (active)

    constructor() {
        this.players = [];
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempDeck = [];
    }
    
    start(playerOneName: string, playerTwoName: string) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        this.regDeck.createDeck();
        this.regDeck.shuffleDeck();    
        //picking phase
        //split deck
        this.tempDeck[0] = this.regDeck.deck.slice(0,14);
        this.tempDeck[1] = this.regDeck.deck.slice(15,29);
        this.deckGroup[0][0] = this.tempDeck[0].slice(0,2);
        this.deckGroup[0][1] = this.tempDeck[0].slice(3,5);
        this.deckGroup[0][2] = this.tempDeck[0].slice(6,8);
        this.deckGroup[0][3] = this.tempDeck[0].slice(9,11);
        this.deckGroup[0][4] = this.tempDeck[0].slice(12,14);
        this.deckGroup[1][0] = this.tempDeck[1].slice(0,2);
        this.deckGroup[1][1] = this.tempDeck[1].slice(3,5);
        this.deckGroup[1][2] = this.tempDeck[1].slice(6,8);
        this.deckGroup[1][3] = this.tempDeck[1].slice(9,11);
        this.deckGroup[1][4] = this.tempDeck[1].slice(12,14);
    }
}