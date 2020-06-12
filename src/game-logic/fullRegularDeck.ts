import anaak from '../data/regulars/anaak.json';
import arkraptor from '../data/regulars/arkraptor.json';
import baam from '../data/regulars/baam.json';
import beta from '../data/regulars/beta.json';
import cassano from '../data/regulars/cassano.json';
import chang from '../data/regulars/chang.json';
import dan from '../data/regulars/dan.json';
import ehwa from '../data/regulars/ehwa.json';
import endorsi from '../data/regulars/endorsi.json';
import goseng from '../data/regulars/goseng.json';
import hatz from '../data/regulars/hatz.json';
import horyang from '../data/regulars/horyang.json';
import hwaryun from '../data/regulars/hwaryun.json';
import khun_aa from '../data/regulars/khun_aa.json';
import khun_ran from '../data/regulars/khun_ran.json';
import lauroe from '../data/regulars/lauroe.json';
import mad_dog from '../data/regulars/mad_dog.json';
import mei from '../data/regulars/mei.json';
import miseng from '../data/regulars/miseng.json';
import novick from '../data/regulars/novick.json';
import parakewl from '../data/regulars/parakewl.json';
import prince from '../data/regulars/prince.json';
import quoetro from '../data/regulars/quoetro.json';
import rachel from '../data/regulars/rachel.json';
import rak from '../data/regulars/rak.json';
import shibisu from '../data/regulars/shibisu.json';
import verdi from '../data/regulars/verdi.json';
import vespa from '../data/regulars/vespa.json';
import wangnam from '../data/regulars/wangnam.json';
import xiaxia from '../data/regulars/xiaxia.json';

import { RegularCard } from './regularCard';
import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class FullRegularDeck extends Schema {
  @type([RegularCard])
  deck: ArraySchema<RegularCard>;

  constructor() {
    super();
    this.deck = new ArraySchema<RegularCard>();
  }

  addCard(reg: any) {
    this.deck.push(new RegularCard(reg.name, reg.position, reg.affiliations, reg.shinsoo, reg.int, reg.str, reg.speed));
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
    this.addCard(anaak);
    this.addCard(arkraptor);
    this.addCard(baam);
    this.addCard(beta);
    this.addCard(cassano);
    this.addCard(chang);
    this.addCard(dan);
    this.addCard(ehwa);
    this.addCard(endorsi);
    this.addCard(goseng);
    this.addCard(hatz);
    this.addCard(horyang);
    this.addCard(hwaryun);
    this.addCard(khun_aa);
    this.addCard(khun_ran);
    this.addCard(lauroe);
    this.addCard(mad_dog);
    this.addCard(mei);
    this.addCard(miseng);
    this.addCard(novick);
    this.addCard(parakewl);
    this.addCard(prince);
    this.addCard(quoetro);
    this.addCard(rachel);
    this.addCard(rak);
    this.addCard(shibisu);
    this.addCard(verdi);
    this.addCard(vespa);
    this.addCard(wangnam);
    this.addCard(xiaxia);
  }
  
  printDeck() {
    console.log(this.deck);
  }
}
