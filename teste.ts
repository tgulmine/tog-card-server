import { RegularCard } from './game-logic/regular-card';

export class Teste {
    xiaxia = new RegularCard("Xia Xia", "Light Bearer", ["Fug"], 5, 7, 6, 4);

    printCard()  {
        console.log(this.xiaxia);
    }
}