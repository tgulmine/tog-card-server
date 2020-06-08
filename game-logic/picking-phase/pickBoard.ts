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
    deckGroup1: Array<Array<PickRegularCard>>;
    deckGroup2: Array<Array<PickRegularCard>>;

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
        this.regDeck.deck.slice(0,15).forEach(card => {
            this.tempDeck1.push(new PickRegularCard(card))
        });
        this.regDeck.deck.slice(15,30).forEach(card => {
            this.tempDeck2.push(new PickRegularCard(card))
        });

        console.log(this.tempDeck1.length, this.tempDeck2.length);

        this.deckGroup1 = [];
        for (let i = 0; i < this.tempDeck1.length; i = i+3) {
           console.log('pushing', {i})
          this.deckGroup1.push(this.tempDeck1.slice(i,i+3));
        }
        this.deckGroup2 = [];
        for (let i = 0; i < this.tempDeck2.length; i = i+3) {
          this.deckGroup2.push(this.tempDeck2.slice(i,i+3));
        }

        console.log({deck: this.deckGroup1, activeCards: this.totalCardsActivesInDeckGroup(this.deckGroup1)})
        console.log(this.deckGroup1[0][0].toString())
    }

    totalCardsActivesInDeckGroup(deckGroup: Array<Array<PickRegularCard>>): number {
        let total = 0;
        deckGroup.forEach(cardGroup => {
            total +=  this.activeCardsInCardGroup(cardGroup)
        });
        return total;
    }

    activeCardsInCardGroup(cardGroup: Array<PickRegularCard>) {
        return cardGroup.filter(card => card.isActive).length
    }
}