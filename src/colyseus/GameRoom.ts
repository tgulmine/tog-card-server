import { Room, Client } from "colyseus";
import { GameState } from './GameState';
import { PickBoard } from "../game-logic/picking-phase/pickBoard";

export class GameRoom extends Room<GameState> {

  onCreate (options: any) {

    this.setState(new GameState());
    this.state.pickBoard.start('asdas', 'bbbf');

    this.onMessage("pickCard", (client, message) => {
      console.log(message.name);
      const card = this.state.pickBoard.tempRegDeck1.find(card => {
        console.log(card.regularCard.name)
        return card.regularCard.name === message.name
      });
      console.log(card);
      if (card) card.onClick();
    });
  }

  onJoin (client: Client, options: any) {
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}
