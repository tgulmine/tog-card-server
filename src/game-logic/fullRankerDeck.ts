import evan from '../data/rankers/evan.json';
import hansung from '../data/rankers/hansung.json';
import headon from '../data/rankers/headon.json';
import jinsung from '../data/rankers/jinsung.json';
import leroro from '../data/rankers/leroro.json';
import love from '../data/rankers/love.json';
import quant from '../data/rankers/quant.json';
import ren from '../data/rankers/ren.json';
import urek from '../data/rankers/urek.json';
import yuri from '../data/rankers/yuri.json';

import { RankerCard } from './RankerCard';
import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class FullRankerDeck extends Schema {
  @type([RankerCard])
  deck: ArraySchema<RankerCard>;

  constructor() {
    super();
    this.deck = new ArraySchema<RankerCard>();
  }

  addCard(reg: any) {
    this.deck.push(new RankerCard(reg.name, reg.skill, reg.description, reg.cooldown));
  }

  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
        location1 = Math.floor((Math.random() * this.deck.length));
        location2 = Math.floor((Math.random() * this.deck.length));
        tmp = this.deck[location1];
        this.deck[location1] = this.deck[location2];
        this.deck[location2] = tmp;
     }
 }

  createDeck()  {
    this.addCard(evan);
    this.addCard(hansung);
    this.addCard(headon);
    this.addCard(jinsung);
    this.addCard(leroro);
    this.addCard(love);
    this.addCard(quant);
    this.addCard(ren);
    this.addCard(urek);
    this.addCard(yuri);
  }
  
  printDeck() {
    console.log(this.deck);
  }
}
