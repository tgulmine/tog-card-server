import { RegularCard } from './regularCard';
import { RankerCard } from './rankerCard';

import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("string")
    playerName: string;

    @type([ RegularCard ])
    regularDeck = new ArraySchema<RegularCard>();
    
    @type([ RankerCard ])
    rankerDeck = new ArraySchema<RankerCard>();

    constructor(name: string) {
        super();
        
        this.playerName = name;
    }
}