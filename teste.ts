import { RegularCard } from './game-logic/regularCard';
import { FullRegularDeck } from './game-logic/fullRegularDeck';
import { RankerCard } from './game-logic/rankerCard';
import { FullRankerDeck } from './game-logic/fullRankerDeck';

export class Teste {
    RegularDeck = new FullRegularDeck();
    RankerDeck = new FullRankerDeck();

    printCard() {
        this.RegularDeck.createDeck();
        this.RegularDeck.shuffleDeck();
        this.RegularDeck.printDeck();
        this.RankerDeck.createDeck();
        this.RankerDeck.shuffleDeck();
        this.RankerDeck.printDeck();
    }
}