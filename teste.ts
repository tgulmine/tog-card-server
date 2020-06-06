import { RegularCard } from './game-logic/regular-card';
import { GetRegulars } from './game-logic/get-regulars';

export class Teste {
    xiaxia = new RegularCard("Xia Xia", "Light Bearer", ["Fug"], 5, 7, 6, 4);

    printCard2()  {
        console.log(this.xiaxia);
    }

    anak2: RegularCard;
    bam2: RegularCard;
    deck2: Array<RegularCard>;

    getreg = new GetRegulars();
    printCard() {
        this.getreg.createDeck();
        this.getreg.shuffleDeck();
        this.getreg.printDeck();
    }
}