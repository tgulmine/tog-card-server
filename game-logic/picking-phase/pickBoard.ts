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

    groupSizeP1: number;
    groupSizeP2: number;
    regCardsPickedP1: number;
    regCardsPickedP2: number;

    constructor() {
        this.players = [];
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempDeck1 = [];
        this.tempDeck2 = [];
        this.groupSizeP1 = 3;
        this.groupSizeP2 = 2;
        this.regCardsPickedP1 = 7;
        this.regCardsPickedP2 = 5;
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
        //Fill temp decks with half the whole deck, 15 cards each
        this.regDeck.deck.slice(0,this.regDeck.deck.length/2).forEach(card => {
            this.tempDeck1.push(new PickRegularCard(card))
        });
        this.regDeck.deck.slice(this.regDeck.deck.length/2,this.regDeck.deck.length).forEach(card => {
            this.tempDeck2.push(new PickRegularCard(card))
        });

        console.log(this.tempDeck1.length, this.tempDeck2.length);

        //Put 3 cards in 5 card groups for each player
        this.deckGroup1 = [];
        for (let i = 0; i < this.tempDeck1.length; i = i+this.groupSizeP1) {
           console.log('pushing', {i})
          this.deckGroup1.push(this.tempDeck1.slice(i,i+this.groupSizeP1));
        }
        this.deckGroup2 = [];
        for (let i = 0; i < this.tempDeck2.length; i = i+this.groupSizeP1) {
          this.deckGroup2.push(this.tempDeck2.slice(i,i+this.groupSizeP1));
        }

        console.log({deck: this.deckGroup1.toString(), activeCards: this.totalCardsActivesInDeckGroup(this.deckGroup1), 
            checkMinCards: this.checkMinActiveCards(this.deckGroup1)})
        console.log(this.deckGroup1[0][0].toString())
        this.printDeckGroup(this.deckGroup1);
    }

    totalCardsActivesInDeckGroup(deckGroup: Array<Array<PickRegularCard>>): number {
        let total = 0;
        deckGroup.forEach(cardGroup => {
            total +=  this.activeCardsInCardGroup(cardGroup)
        });
        return total;
    }

    checkMinActiveCards(deckGroup: Array<Array<PickRegularCard>>): boolean {
        let total = 0;
        deckGroup.forEach(cardGroup => {
            if(this.activeCardsInCardGroup(cardGroup) > 0) total++;
        });
        if (total === deckGroup.length) return true;
        else return false;
    }

    activeCardsInCardGroup(cardGroup: Array<PickRegularCard>) {
        return cardGroup.filter(card => card.isActive).length;
    }

    printDeckGroup(deckGroup: Array<Array<PickRegularCard>>) {
        deckGroup.forEach((cardGroup, index) => {
            console.log('Group ' + (index+1) + ': ' + cardGroup);
        });
    }
}