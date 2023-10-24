import { Colors } from "./Colors";

export class Player {
  color: Colors;
  kingIsUnderAttack: boolean = false;

  constructor(color: Colors) {
    this.color = color;
  }
}
