import { Player } from '../player';
import { FullRegularDeck } from '../fullRegularDeck';
import { FullRankerDeck } from '../fullRankerDeck';
import { RegularCard } from '../regularCard';
import { PickRegularCard } from './pickRegularCard'

export class PickBoard {
    player1: Player;
    player2: Player;
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

    p1confirmed: boolean;
    p2confirmed: boolean;

    constructor() {
        //this.player1 = null;
        //this.player2 = null;
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempDeck1 = [];
        this.tempDeck2 = [];
        this.groupSizeP1 = 3;
        this.groupSizeP2 = 2;
        this.regCardsPickedP1 = 7;
        this.regCardsPickedP2 = 5;
        this.p1confirmed = false;
        this.p2confirmed = false;
    }
    
    start(playerOneName: string, playerTwoName: string) {
        this.player1 = new Player(playerOneName);
        this.player2 = new Player(playerTwoName);
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
          this.deckGroup1.push(this.tempDeck1.slice(i,i+this.groupSizeP1));
        }
        this.deckGroup2 = [];
        for (let i = 0; i < this.tempDeck2.length; i = i+this.groupSizeP1) {
          this.deckGroup2.push(this.tempDeck2.slice(i,i+this.groupSizeP1));
        }

        console.log({deck: this.deckGroup1.toString(), activeCards: this.totalCardsActivesInDeckGroup(this.deckGroup1), 
            checkMinCards: this.checkMinActiveCards(this.deckGroup1)})
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

    pushActiveCardsToDeck(player: Player, deckGroup: Array<Array<PickRegularCard>>) {
        deckGroup.forEach(cardGroup => {
            cardGroup.forEach(card => {
                if(card.isActive) player.regularDeck.push(card.regularCard);
            })
        });
    }

    printDeckGroup(deckGroup: Array<Array<PickRegularCard>>) {
        deckGroup.forEach((cardGroup, index) => {
            console.log('Group ' + (index+1) + ': ' + cardGroup);
        });
    }

    confirmPhase1(player: Player, deckGroup: Array<Array<PickRegularCard>>) {
        if (this.totalCardsActivesInDeckGroup(deckGroup) === this.regCardsPickedP1 &&
            this.checkMinActiveCards(deckGroup)) {
                this.pushActiveCardsToDeck(player, deckGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 7 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    checkIfPlayersConfirmed(player: Player) {
        if (player === this.player1) this.p1confirmed = true;
        else this.p2confirmed = true;
        if (this.p1confirmed && this.p2confirmed) {
            this.p1confirmed = false;
            this.p2confirmed = false;
            this.phase2();
        }
    }

    phase2() {
        //rs
    }
}