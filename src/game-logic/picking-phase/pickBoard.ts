import { Player } from '../player';
import { FullRegularDeck } from '../fullRegularDeck';
import { FullRankerDeck } from '../fullRankerDeck';
import { PickRegularCard } from './pickRegularCard'
import { PickRankerCard } from './pickRankerCard'
import { Board } from '../board';

import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
import { RegularCard } from '../regularCard';

class GroupPickRegularCard extends Schema {
    @type([PickRegularCard])
    cards: ArraySchema<PickRegularCard>;
    constructor() {
        super();
        this.cards = new ArraySchema<PickRegularCard>();
    }
}

export class PickBoard extends Schema {
    @type(Player) 
    player1: Player;

    @type(Player)
    player2: Player;

    @type(FullRegularDeck)
    regDeck: FullRegularDeck;

    @type(FullRankerDeck)
    rankDeck: FullRankerDeck;
    
    @type([PickRegularCard])
    tempRegDeck1: ArraySchema<PickRegularCard>;
    
    @type([PickRegularCard])
    tempRegDeck2: ArraySchema<PickRegularCard>;
    
    @type([PickRankerCard])
    tempRankDeck1: ArraySchema<PickRankerCard>;
    
    @type([PickRankerCard])
    tempRankDeck2: ArraySchema<PickRankerCard>;

    @type([GroupPickRegularCard])
    deckRegGroup1: ArraySchema<GroupPickRegularCard>;

    @type([GroupPickRegularCard])
    deckRegGroup2: ArraySchema<GroupPickRegularCard>;

    @type("number")
    regGroupSizeP1: number;

    @type("number")
    regGroupSizeP2: number;

    @type("number")
    regCardsPickedP1: number;

    @type("number")
    regCardsPickedP2: number;

    @type("number")
    rankCardsPickedP1: number;

    @type("number")
    rankCardsPickedP2: number;

    @type("boolean")
    p1confirmed: boolean;

    @type("boolean")
    p2confirmed: boolean;

    @type("number")
    currentPhase: number;

    @type(Board)
    board: Board;

    constructor() {
        super();
        //this.player1 = null;
        //this.player2 = null;
        this.regDeck = new FullRegularDeck;
        this.rankDeck = new FullRankerDeck;
        this.tempRegDeck1 = new ArraySchema<PickRegularCard>();
        this.tempRegDeck2 = new ArraySchema<PickRegularCard>();
        this.tempRankDeck1 = new ArraySchema<PickRankerCard>();
        this.tempRankDeck2 = new ArraySchema<PickRankerCard>();
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

    totalRegCardsActiveInDeckGroup(deckRegGroup: ArraySchema<GroupPickRegularCard>): number {
        let total = 0;
        deckRegGroup.forEach(cardGroup => {
            total +=  this.activeRegCardsInCardGroup(cardGroup)
        });
        return total;
    }

    checkMinActiveRegCards(deckRegGroup: ArraySchema<GroupPickRegularCard>): boolean {
        let total = 0;
        deckRegGroup.forEach(cardGroup => {
            if(this.activeRegCardsInCardGroup(cardGroup) > 0) total++;
        });
        if (total === deckRegGroup.length) return true;
        else return false;
    }

    activeRegCardsInCardGroup(cardGroup: GroupPickRegularCard) {
        return cardGroup.cards.filter(card => card.isActive).length;
    }

    pushActiveRegCardsToDeck(player: Player, deckRegGroup: Array<GroupPickRegularCard>) {
        deckRegGroup.forEach(cardGroup => {
            cardGroup.cards.forEach(card => {
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

    pushActiveRankCardsToDeck(player: Player, tempRankDeck: ArraySchema<PickRankerCard>) {
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

    totalRankCardsActiveInTempDeck(tempRankDeck: ArraySchema<PickRankerCard>): number {
        let total = 0;
        total +=  tempRankDeck.filter(card => card.isActive).length;
        return total;
    }

    printRegDeckGroup(deckRegGroup: ArraySchema<GroupPickRegularCard>) {
        deckRegGroup.forEach((cardGroup, index) => {
            console.log('Group ' + (index+1) + ': ' + cardGroup.cards);
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

    confirmPhase1(player: Player, deckRegGroup: ArraySchema<GroupPickRegularCard>) {
        if (this.totalRegCardsActiveInDeckGroup(deckRegGroup) === this.regCardsPickedP1 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 7 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    confirmPhase2(player: Player, deckRegGroup: ArraySchema<GroupPickRegularCard>) {
        if (this.totalRegCardsActiveInDeckGroup(deckRegGroup) === this.regCardsPickedP2 &&
            this.checkMinActiveRegCards(deckRegGroup)) {
                this.pushActiveRegCardsToDeck(player, deckRegGroup);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 5 cartas, com ao menos 1 de cada grupo' sl ou mostra separado
        }
    }

    confirmPhase3(player: Player, tempRankDeck: ArraySchema<PickRankerCard>) {
        if (this.totalRankCardsActiveInTempDeck(tempRankDeck) === this.rankCardsPickedP1) {
                this.pushActiveRankCardsToDeck(player, tempRankDeck);
                this.checkIfPlayersConfirmed(player);
        }   else {
            //retorna erro 'vc precisa escolher 2 cartas' sl
        }
    }

    confirmPhase4(player: Player, tempRankDeck: ArraySchema<PickRankerCard>) {
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
        this.deckRegGroup1 = new ArraySchema<GroupPickRegularCard>();
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.regGroupSizeP1) {
            let group = new GroupPickRegularCard();
            group.cards[0] = this.tempRegDeck1[i];
            group.cards[1] = this.tempRegDeck1[i+1];
            group.cards[2] = this.tempRegDeck1[i+2];
            this.deckRegGroup1.push(group);    
        }
        this.deckRegGroup2 = new ArraySchema<GroupPickRegularCard>();
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.regGroupSizeP1) {
            let group = new GroupPickRegularCard();
            group.cards[0] = this.tempRegDeck2[i];
            group.cards[1] = this.tempRegDeck2[i+1];
            group.cards[2] = this.tempRegDeck2[i+2];
            this.deckRegGroup2.push(group); 
        }

        console.log({deck: this.deckRegGroup1.toString(), activeCards: this.totalRegCardsActiveInDeckGroup(this.deckRegGroup1), 
            checkMinCards: this.checkMinActiveRegCards(this.deckRegGroup1)})
        this.printRegDeckGroup(this.deckRegGroup1);
    }

    phase2() {
        console.log(this.tempRegDeck1.length, this.tempRegDeck2.length);

        //Switch decks
        let tempRegDeckSwitch = this.tempRegDeck1;
        this.tempRegDeck1 = this.tempRegDeck2;
        this.tempRegDeck2 = tempRegDeckSwitch;

        //Put 2 cards in 4 card groups for each player, switching temp decks
        this.deckRegGroup1 = new ArraySchema<GroupPickRegularCard>();
        for (let i = 0; i < this.tempRegDeck1.length; i = i+this.regGroupSizeP2) {
            let group = new GroupPickRegularCard();
            group.cards[0] = this.tempRegDeck1[i];
            group.cards[1] = this.tempRegDeck1[i+1];
            this.deckRegGroup1.push(group); 
        }
        this.deckRegGroup2 = new ArraySchema<GroupPickRegularCard>();
        for (let i = 0; i < this.tempRegDeck2.length; i = i+this.regGroupSizeP2) {
            let group = new GroupPickRegularCard();
            group.cards[0] = this.tempRegDeck2[i];
            group.cards[1] = this.tempRegDeck2[i+1];
            this.deckRegGroup2.push(group); 
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
    }

    phase4() {
        //Switch decks
        let tempRankDeckSwitch = this.tempRankDeck1;
        this.tempRankDeck1 = this.tempRankDeck2;
        this.tempRankDeck2 = tempRankDeckSwitch;

        console.log(this.tempRankDeck1.length, this.tempRankDeck2.length);
    }

    startGame() {
        this.board = new Board(this.player1, this.player2);
        this.board.start();
    }
}