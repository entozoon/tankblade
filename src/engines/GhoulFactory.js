import Pixi from "../engines/Pixi";
import Ghoul from "../entities/Ghoul";
import Hero from "../entities/Hero";
import { constrain } from "../lib/utilities";
import { randomOutsidePerimeter } from "../lib/utilities";
import { ghoulCountGettingHairy, ghoulCountGameOver } from "../settings";
import Background from "../effects/Background";

export default class {
  constructor({ timeoutStart, timeoutEnd, gameOver }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.ghouls = [];
    // this.waveTimer = 0;
    this.makeCount = 0;
    this.makeTimeout = 0;
    this.gettingHairy = () => this.ghouls.length > ghoulCountGettingHairy;
    this.gettingHairyChanging = false;
    ghoulCountGettingHairy;
    this.gameOver = gameOver;
    this.reset = this.reset;
  }
  dieAtTheGhoulFactory(id) {
    const dyingGhoul = this.ghouls.filter(g => g.id === id)[0];
    // Not sure how this is getting triggered again after death, but be reet
    if (dyingGhoul) {
      dyingGhoul.spriteRemove();
      this.ghouls = this.ghouls.filter(g => g.id !== id);
    }
  }
  make(makeCount) {
    this.ghouls.push(
      new Ghoul({
        id: makeCount,
        hp: 1,
        // hp: makeCount < 300 ? 1 : 20,
        position: randomOutsidePerimeter(),
        thrustPower: 0.0025 + Math.random() * 0.004,
        thrustLimit: 0.01 + Math.random() * 0.01,
        dieAtTheGhoulFactory: this.dieAtTheGhoulFactory.bind(this)
      })
    );
  }
  reset() {
    this.ghouls.forEach(g => g.spriteRemove());
    this.ghouls = [];
  }
  update(dt, wave) {
    // Create ghouls, at an appropriate speed
    // (turns out, having a natural feeling wave of baddiez isn't easy..)
    const makeFrequency = constrain(
      5000 - (Math.pow(wave, 0.1) - 1) * 20000,
      50
    );
    this.makeTimeout += dt;
    if (!this.ghouls.length || this.makeTimeout > makeFrequency) {
      this.make(++this.makeCount);
      this.makeTimeout = 0;
    }

    // Flash red if we're in trouble
    if (this.gettingHairy()) {
      Background.gettingHairy = true;
    } else if (Background.gettingHairy) {
      Background.reset(); // Only run the once
      Background.gettingHairy = false;
    }
    // console.log(this.ghouls.length);
    if (this.ghouls.length > ghoulCountGameOver) {
      this.gameOver();
    }

    this.ghouls.forEach(g => g.update(dt));
  }
}
