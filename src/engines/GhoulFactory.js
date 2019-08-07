import Pixi from "../engines/Pixi";
import Ghoul from "../entities/Ghoul";
import { constrain } from "../lib/utilities";
import { randomOutsidePerimeter } from "../lib/utilities";

export default class {
  constructor({ timeoutStart, timeoutEnd, hero }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.hero = hero;
    this.ghouls = [];
    // this.waveTimer = 0;
    this.makeCount = 0;
    this.makeTimeout = 0;
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
    // this.waveTimer += dt;
    // this.timeout -= dt * 0.05; // hacky but yeah
    // this.wave = Math.floor(this.waveTimer / 1000);
    // this.timeout =
    //   this.timeout < this.timeoutEnd ? this.timeoutEnd : this.timeout; // endgame

    // this.wave = Math.floor(this.waveTimer / this.timeout);
    // this.makeTimeout = 1000
    // this.wave = 300;

    // Turns out, having a natural feeling wave of baddiez isn't easy
    const makeFrequency = constrain(
      5000 - (Math.pow(wave, 0.1) - 1) * 20000,
      50
    );

    this.makeTimeout += dt;
    if (!this.ghouls.length || this.makeTimeout > makeFrequency) {
      this.make(++this.makeCount);
      this.makeTimeout = 0;
    }

    // if (this.ghouls
    // if (this.ghouls.length > 0)
    //   console.log(this.ghouls[this.ghouls.length - 1].id);
    // if (
    //   this.ghouls.length == 0 ||
    //   this.ghouls[this.ghouls.length - 1].id < this.wave
    // ) {
    //   console.log(this.wave, this.ghouls.length, dt);
    //   this.make(this.wave);
    // }

    this.ghouls.forEach(g => g.update(dt));

    if (this.ghouls.length > 200) {
      console.error("Game over!");
    }

    if (this.ghouls.length > 1) {
      Pixi.bg.tint = 0x000000;
    }
  }
}
