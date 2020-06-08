import { RegularCard } from './regularCard';
import { RankerCard } from './rankerCard';

export class Player {
    playerName: string;
    regularDeck: Array<RegularCard>;
    rankerDeck: Array<RankerCard>;

    constructor(name: string) {
        this.playerName = name;
        this.regularDeck = [];
        this.rankerDeck = [];
    }
}