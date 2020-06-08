import { Player } from '../player';
import { FullRegularDeck } from '../fullRegularDeck';
import { FullRankerDeck } from '../fullRankerDeck';
import { RegularCard } from '../regularCard';
import { PickRegularCard } from './pickRegularCard'

export class PickBoard {
    players: Array<Player>;
    regDeck: FullRegularDeck;
    rankDeck: FullRankerDeck;
    tempDeck1: Array<PickRegularCard>;
    tempDeck2: Array<PickRegularCard>;
    deckGroup1: Array<Array<RegularCard>>;
    deckGroup2: Array<Array<RegularCard>>;

    constructor() {
        this.players = [];
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempDeck1 = [];
        this.tempDeck2 = [];
    }
    
    start(playerOneName: string, playerTwoName: string) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        this.regDeck.createDeck();
        this.regDeck.shuffleDeck(); 
        this.rankDeck.createDeck();
        this.rankDeck.shuffleDeck();   
        this.phase1();
    }

    phase1() {
        /* this.tempDeck1 = this.regDeck.deck.slice(0,14);
        this.tempDeck2 = this.regDeck.deck.slice(15,29); */

        this.deckGroup1[0] = this.tempDeck1.slice(0,2);
        this.deckGroup1[1] = this.tempDeck1.slice(3,5);
        this.deckGroup1[2] = this.tempDeck1.slice(6,8);
        this.deckGroup1[3] = this.tempDeck1.slice(9,11);
        this.deckGroup1[4] = this.tempDeck1.slice(12,14);
        this.deckGroup2[0] = this.tempDeck2.slice(0,2);
        this.deckGroup2[1] = this.tempDeck2.slice(3,5);
        this.deckGroup2[2] = this.tempDeck2.slice(6,8);
        this.deckGroup2[3] = this.tempDeck2.slice(9,11);
        this.deckGroup2[4] = this.tempDeck2.slice(12,14);
    }
}