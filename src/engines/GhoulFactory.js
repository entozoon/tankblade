import Pixi from "../engines/Pixi";
import Ghoul from "../entities/Ghoul";
import { constrain } from "../lib/utilities";
import { randomOutsidePerimeter } from "../lib/utilities";
import { ghoulCountGettingHairy, ghoulCountGameOver } from "../config";

export default class {
  constructor({ timeoutStart, timeoutEnd, hero }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.hero = hero;
    this.ghouls = [];
    // this.waveTimer = 0;
    this.makeCount = 0;
    this.makeTimeout = 0;
    this.gettingHairy = () => this.ghouls.length > ghoulCountGettingHairy;
    this.gettingHairyTimeout = 0;
    this.gettingHairyPulseSpeed = 500;
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
        // Just gonna expose the whole thing, it's doing my head in
        hero: this.hero,
        dieAtTheGhoulFactory: this.dieAtTheGhoulFactory.bind(this)
      })
    );
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
      this.gettingHairyTimeout += dt;
      Pixi.bg.alpha = 1;
      Pixi.bg.tint =
        0xffffff -
        0x00ffff *
          (1 -
            Math.abs(
              (this.gettingHairyTimeout % this.gettingHairyPulseSpeed) * 2 -
                this.gettingHairyPulseSpeed
            ) /
              this.gettingHairyPulseSpeed);
    }
    if (this.ghouls.length > ghoulCountGameOver) {
      console.error("Game over?");
    }

    this.ghouls.forEach(g => g.update(dt));
  }
}
