import Pixi from "../engines/Pixi";
import Ghoul from "../entities/Ghoul";
import { constrain } from "../lib/utilities";
import { randomOutsidePerimeter } from "../lib/utilities";
import { ghoulCountGettingHairy, ghoulCountGameOver } from "../config";
import Background from "../effects/Background";

export default class {
  constructor({ timeoutStart, timeoutEnd, hero, gameOver }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.hero = hero;
    this.ghouls = [];
    // this.waveTimer = 0;
    this.makeCount = 0;
    this.makeTimeout = 0;
    this.gettingHairy = () => this.ghouls.length > ghoulCountGettingHairy;
    this.gettingHairyChanging = false;
    ghoulCountGettingHairy;
    this.gameOver = gameOver;
    this.reboot = this.reboot;
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
  reboot() {
    console.log("GhoulFactory reboot..");
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

    if (this.ghouls.length > ghoulCountGameOver) {
      this.gameOver;
    }

    this.ghouls.forEach(g => g.update(dt));
  }
}
