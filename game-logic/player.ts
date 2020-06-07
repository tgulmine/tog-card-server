import { RegularCard } from './regularCard';

export class Player {
    playerName: string;
    playerCards: Array<RegularCard>;

    constructor(name: string) {
        this.playerName = name;
        this.playerCards = [];
    }
}