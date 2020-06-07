import { RegularCard } from './game-logic/regular-card';
import { FullRegularDeck } from './game-logic/fullRegularDeck';

export class Teste {
    fullDeck = new FullRegularDeck();
    
    printCard() {
        this.fullDeck.createDeck();
        this.fullDeck.shuffleDeck();
        this.fullDeck.printDeck();
    }
}