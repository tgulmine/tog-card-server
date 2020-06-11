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

    regGroupSizeP1: number;
    regGroupSizeP2: number;
    regCardsPickedP1: number;
    regCardsPickedP2: number;
    rankCardsPickedP1: number;
    rankCardsPickedP2: number;

    p1confirmed: boolean;
    p2confirmed: boolean;
    currentPhase: number;

    constructor() {
        //this.player1 = null;
        //this.player2 = null;
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempRegDeck1 = [];
        this.tempRegDeck2 = [];
        this.tempRankDeck1 = [];
        this.tempRankDeck2 = [];
        this.regGroupSizeP1 = 3;
        this.regGroupSizeP2 = 2;
        this.regCardsPickedP1 = 7;
        this.regCardsPickedP2 = 5;
        this.rankCardsPickedP1 = 2;
        this.rankCardsPickedP2 = 1;
        this.p1confirmed = false;
        this.p2confirmed = false;
        this.currentPhase = 1;
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

    totalRegCardsActiveInDeckGroup(deckRegGroup: Array<Array<PickRegularCard>>): number {
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

    pushActiveRankCardsToDeck(player: Player, tempRankDeck: Array<PickRankerCard>) {
        tempRankDeck.forEach(card => {
                if(card.isActive) {
                    player.rankerDeck.push(card.rankerCard);
                    if (player === this.player1) {
                        var index = this.tempRankDeck1.indexOf( card );
                        this.tempRankDeck1.splice(index, 0);
                    } else {
                        var index = this.tempRankDeck2.indexOf( card );
                        this.tempRankDeck2.splice(index, 0);
                    }
                }
        });
    }

    totalRankCardsActiveInTempDeck(tempRankDeck: Array<PickRankerCard>): number {
        let total = 0;
        total +=  tempRankDeck.filter(card => card.isActive).length;
        return total;
    }

    printRegDeckGroup(deckRegGroup: Array<Array<PickRegularCard>>) {
        deckRegGroup.forEach((cardGroup, index) => {
            console.log('Group ' + (index+1) + ': ' + cardGroup);
        });
    }

    clickConfirm(player: Player) {
        if (player === this.player1) {
            if (this.currentPhase === 1) this.confirmPhase1(player, this.deckRegGroup1);
            else if (this.currentPhase === 2) this.confirmPhase2(player, this.deckRegGroup1);
            else if (this.currentPhase === 3) this.confirmPhase3(player, this.tempRankDeck1);
            else if (this.currentPhase === 4) this.confirmPhase4(player, this.tempRankDeck1);
        } else {
            if (this.currentPhase === 1) this.confirmPhase1(player, this.deckRegGroup2);
            else if (this.currentPhase === 2) this.confirmPhase2(player, this.deckRegGroup2);
            else if (this.currentPhase === 3) this.confirmPhase3(player, this.tempRankDeck2);
            else if (this.currentPhase === 4) this.confirmPhase4(player, this.tempRankDeck2);
        }
    }

    confirmPhase1(player: Player, deckRegGroup: Array<Array<PickRegularCard>>) {
        if (this.totalRegCardsActiveInDeckGroup(deckRegGroup) === this.regCardsPickedP1 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 7 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    confirmPhase2(player: Player, deckRegGroup: Array<Array<PickRegularCard>>) {
        if (this.totalRegCardsActiveInDeckGroup(deckRegGroup) === this.regCardsPickedP2 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 5 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    confirmPhase3(player: Player, tempRankDeck: Array<PickRankerCard>) {
        if (this.totalRankCardsActiveInTempDeck(tempRankDeck) === this.rankCardsPickedP1) {
                this.pushActiveRankCardsToDeck(player, tempRankDeck);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 2 cartas' sl
        }
    }

    confirmPhase4(player: Player, tempRankDeck: Array<PickRankerCard>) {
        if (this.totalRankCardsActiveInTempDeck(tempRankDeck) === this.rankCardsPickedP2) {
                this.pushActiveRankCardsToDeck(player, tempRankDeck);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 1 carta' sl
        }
    }

    checkIfPlayersConfirmed(player: Player) {
        if (player === this.player1) this.p1confirmed = true;
        else this.p2confirmed = true;
        if (this.p1confirmed && this.p2confirmed) {
            this.p1confirmed = false;
            this.p2confirmed = false;
            if (this.currentPhase === 1) this.phase2();
            else if (this.currentPhase === 2) this.phase3();
            else if (this.currentPhase === 3) this.phase4();
            else if (this.currentPhase === 4) this.startGame();
            this.currentPhase++;
        }
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
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.regGroupSizeP1) {
          this.deckRegGroup1.push(this.tempRegDeck1.slice(i,i+this.regGroupSizeP1));
        }
        this.deckRegGroup2 = [];
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.regGroupSizeP1) {
          this.deckRegGroup2.push(this.tempRegDeck2.slice(i,i+this.regGroupSizeP1));
        }

        console.log({deck: this.deckRegGroup1.toString(), activeCards: this.totalRegCardsActiveInDeckGroup(this.deckRegGroup1), 
            checkMinCards: this.checkMinActiveRegCards(this.deckRegGroup1)})
        this.printRegDeckGroup(this.deckRegGroup1);
    }

    phase2() {
        console.log(this.tempRegDeck1.length, this.tempRegDeck2.length);

        let tempRegDeckSwitch = this.tempRegDeck1;
        this.tempRegDeck1 = this.tempRegDeck2;
        this.tempRegDeck2 = tempRegDeckSwitch;

        //Put 2 cards in 4 card groups for each player, switching temp decks
        this.deckRegGroup1 = [];
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.regGroupSizeP2) {
          this.deckRegGroup1.push(this.tempRegDeck1.slice(i,i+this.regGroupSizeP2));
        }
        this.deckRegGroup2 = [];
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.regGroupSizeP2) {
          this.deckRegGroup2.push(this.tempRegDeck2.slice(i,i+this.regGroupSizeP2));
        }

        this.printRegDeckGroup(this.deckRegGroup1);
    }

    phase3() {
        //Fill temp decks with half the whole deck, 5 cards each
        this.rankDeck.deck.slice(0,this.rankDeck.deck.length/2).forEach(card => {
            this.tempRankDeck1.push(new PickRankerCard(card))
        });
        this.rankDeck.deck.slice(this.rankDeck.deck.length/2,this.rankDeck.deck.length).forEach(card => {
            this.tempRankDeck2.push(new PickRankerCard(card))
        });

        console.log(this.tempRankDeck1.length, this.tempRankDeck2.length);

        /* console.log({deck: this.deckRegGroup1.toString(), activeCards: this.totalCardsActivesIndeckRegGroup(this.deckRegGroup1), 
            checkMinCards: this.checkMinActiveCards(this.deckRegGroup1)})
        this.printdeckRegGroup(this.deckRegGroup1); */
    }

    phase4() {
        //rs
    }

    startGame() {
        //rs
    }
}