import Pixi from "../engines/Pixi";
import Ghoul from "../entities/Ghoul";
import { randomOutsidePerimeter } from "../lib/utilities";

export default class {
  constructor({ timeoutStart, timeoutEnd, hero }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.hero = hero;
    this.ghouls = [];
    this.waveTimer = 0;
  }
  dieAtTheGhoulFactory(id) {
    const dyingGhoul = this.ghouls.filter(g => g.id === id)[0];
    // Not sure how this is getting triggered again after death, but be reet
    if (dyingGhoul) {
      dyingGhoul.spriteRemove();
      this.ghouls = this.ghouls.filter(g => g.id !== id);
    }
  }
  make(wave) {
    this.ghouls.push(
      new Ghoul({
        id: wave,
        hp: wave < 300 ? 1 : 20,
        position: randomOutsidePerimeter(),
        thrustPower: 0.0025 + Math.random() * 0.004,
        thrustLimit: 0.01 + Math.random() * 0.01,
        // Just gonna expose the whole thing, it's doing my head in
        hero: this.hero,
        dieAtTheGhoulFactory: this.dieAtTheGhoulFactory.bind(this)
      })
    );
  }
  update(dt) {
    this.waveTimer += dt;
    this.timeout -= dt * 0.05; // hacky but yeah
    this.timeout =
      this.timeout < this.timeoutEnd ? this.timeoutEnd : this.timeout; // endgame
    this.wave = Math.floor(this.waveTimer / this.timeout);
    // console.log(this.ghouls.length);
    if (
      !this.ghouls.length ||
      this.ghouls[this.ghouls.length - 1].id < this.wave
    ) {
      this.make(this.wave);
    }
    this.ghouls.forEach(g => g.update(dt));

    if (this.ghouls.length > 200) {
      console.error("Game over!");
    }

    if (this.ghouls.length > 1) {
      Pixi.bg.tint = 0x000000;
    }
  }
}
