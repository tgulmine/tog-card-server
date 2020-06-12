import { RegularCard } from './regularCard';
import { FullRegularDeck } from './fullRegularDeck';
import { RankerCard } from './rankerCard';
import { FullRankerDeck } from './fullRankerDeck';
import { PickBoard } from './picking-phase/pickBoard'

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