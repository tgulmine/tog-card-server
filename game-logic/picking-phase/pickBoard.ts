import { Player } from '../player';
import { FullRegularDeck } from '../fullRegularDeck';
import { FullRankerDeck } from '../fullRankerDeck';
import { PickRegularCard } from './pickRegularCard'
import { PickRankerCard } from './pickRankerCard'

export class PickBoard {
    player1: Player;
    player2: Player;
    regDeck: FullRegularDeck;
    rankDeck: FullRankerDeck;
    tempRegDeck1: Array<PickRegularCard>;
    tempRegDeck2: Array<PickRegularCard>;
    tempRankDeck1: Array<PickRankerCard>;
    tempRankDeck2: Array<PickRankerCard>;
    deckRegGroup1: Array<Array<PickRegularCard>>;
    deckRegGroup2: Array<Array<PickRegularCard>>;
    deckRankGroup1: Array<Array<PickRankerCard>>;
    deckRankGroup2: Array<Array<PickRankerCard>>;

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
        this.tempRegDeck1 = [];
        this.tempRegDeck2 = [];
        this.tempRankDeck1 = [];
        this.tempRankDeck2 = [];
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
            this.tempRegDeck1.push(new PickRegularCard(card))
        });
        this.regDeck.deck.slice(this.regDeck.deck.length/2,this.regDeck.deck.length).forEach(card => {
            this.tempRegDeck2.push(new PickRegularCard(card))
        });

        console.log(this.tempRegDeck1.length, this.tempRegDeck2.length);

        //Put 3 cards in 5 card groups for each player
        this.deckRegGroup1 = [];
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.groupSizeP1) {
          this.deckRegGroup1.push(this.tempRegDeck1.slice(i,i+this.groupSizeP1));
        }
        this.deckRegGroup2 = [];
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.groupSizeP1) {
          this.deckRegGroup2.push(this.tempRegDeck2.slice(i,i+this.groupSizeP1));
        }

        console.log({deck: this.deckRegGroup1.toString(), activeCards: this.totalRegCardsActivesIndeckRegGroup(this.deckRegGroup1), 
            checkMinCards: this.checkMinActiveRegCards(this.deckRegGroup1)})
        this.printRegdeckRegGroup(this.deckRegGroup1);
    }

    totalRegCardsActivesIndeckRegGroup(deckRegGroup: Array<Array<PickRegularCard>>): number {
        let total = 0;
        deckRegGroup.forEach(cardGroup => {
            total +=  this.activeRegCardsInCardGroup(cardGroup)
        });
        return total;
    }

    checkMinActiveRegCards(deckRegGroup: Array<Array<PickRegularCard>>): boolean {
        let total = 0;
        deckRegGroup.forEach(cardGroup => {
            if(this.activeRegCardsInCardGroup(cardGroup) > 0) total++;
        });
        if (total === deckRegGroup.length) return true;
        else return false;
    }

    activeRegCardsInCardGroup(cardGroup: Array<PickRegularCard>) {
        return cardGroup.filter(card => card.isActive).length;
    }

    pushActiveRegCardsToDeck(player: Player, deckRegGroup: Array<Array<PickRegularCard>>) {
        deckRegGroup.forEach(cardGroup => {
            cardGroup.forEach(card => {
                if(card.isActive) {
                    player.regularDeck.push(card.regularCard);
                    if (player === this.player1) {
                        var index = this.tempRegDeck1.indexOf( card );
                        this.tempRegDeck1.splice(index, 0);
                    } else {
                        var index = this.tempRegDeck2.indexOf( card );
                        this.tempRegDeck2.splice(index, 0);
                    }
                }
            })
        });
    }

    printRegdeckRegGroup(deckRegGroup: Array<Array<PickRegularCard>>) {
        deckRegGroup.forEach((cardGroup, index) => {
            console.log('Group ' + (index+1) + ': ' + cardGroup);
        });
    }

    confirmPhase1(player: Player, deckRegGroup: Array<Array<PickRegularCard>>) {
        if (this.totalRegCardsActivesIndeckRegGroup(deckRegGroup) === this.regCardsPickedP1 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 7 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    confirmPhase2(player: Player, deckRegGroup: Array<Array<PickRegularCard>>) {
        if (this.totalRegCardsActivesIndeckRegGroup(deckRegGroup) === this.regCardsPickedP2 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
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
        console.log(this.tempRegDeck1.length, this.tempRegDeck2.length);

        let tempRegDeckSwitch = this.tempRegDeck1;
        this.tempRegDeck1 = this.tempRegDeck2;
        this.tempRegDeck2 = tempRegDeckSwitch;

        //Put 2 cards in 4 card groups for each player, switching temp decks
        this.deckRegGroup1 = [];
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.groupSizeP2) {
          this.deckRegGroup1.push(this.tempRegDeck1.slice(i,i+this.groupSizeP2));
        }
        this.deckRegGroup2 = [];
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.groupSizeP2) {
          this.deckRegGroup2.push(this.tempRegDeck2.slice(i,i+this.groupSizeP2));
        }

        this.printRegdeckRegGroup(this.deckRegGroup1);
    }

    phase3() {
        //Fill temp decks with half the whole deck, 15 cards each
        this.regDeck.deck.slice(0,this.regDeck.deck.length/2).forEach(card => {
            this.tempRegDeck1.push(new PickRegularCard(card))
        });
        this.regDeck.deck.slice(this.regDeck.deck.length/2,this.regDeck.deck.length).forEach(card => {
            this.tempRegDeck2.push(new PickRegularCard(card))
        });

        console.log(this.tempRegDeck1.length, this.tempRegDeck2.length);

        //Put 3 cards in 5 card groups for each player
        this.deckRegGroup1 = [];
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.groupSizeP1) {
          this.deckRegGroup1.push(this.tempRegDeck1.slice(i,i+this.groupSizeP1));
        }
        this.deckRegGroup2 = [];
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.groupSizeP1) {
          this.deckRegGroup2.push(this.tempRegDeck2.slice(i,i+this.groupSizeP1));
        }

        /* console.log({deck: this.deckRegGroup1.toString(), activeCards: this.totalCardsActivesIndeckRegGroup(this.deckRegGroup1), 
            checkMinCards: this.checkMinActiveCards(this.deckRegGroup1)})
        this.printdeckRegGroup(this.deckRegGroup1); */
    }
}