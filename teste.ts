import { RegularCard } from './game-logic/regularCard';
import { FullRegularDeck } from './game-logic/fullRegularDeck';
import { RankerCard } from './game-logic/rankerCard';
import { FullRankerDeck } from './game-logic/fullRankerDeck';
import { PickBoard } from './game-logic/picking-phase/pickBoard'

export class Teste {
    RegularDeck = new FullRegularDeck();
    RankerDeck = new FullRankerDeck();
    Board = new PickBoard();

    printCard() {
        this.Board.start('asd', 'asdd');
        /* this.RegularDeck.createDeck();
        this.RegularDeck.shuffleDeck();
        this.RegularDeck.printDeck();
        this.RankerDeck.createDeck();
        this.RankerDeck.shuffleDeck();
        this.RankerDeck.printDeck(); */
    }
}