import Ghoul from "../entities/Ghoul";
import { randomOutsidePerimeter } from "../lib/utilities";

export default class {
  constructor({ frequency, hero }) {
    this.frequency = frequency;
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
  make() {
    this.ghouls.push(
      new Ghoul({
        id: this.wave,
        position: randomOutsidePerimeter(),
        thrustPower: 0.0025 + Math.random() * 0.002,
        thrustLimit: 0.01 + Math.random() * 0.01,
        hero: {
          thrust: this.hero.thrust,
          position: this.hero.position,
          width: this.hero.width,
          height: this.hero.height
        },
        dieAtTheGhoulFactory: this.dieAtTheGhoulFactory.bind(this)
      })
    );
  }
  update(dt) {
    this.waveTimer += dt;
    this.wave = Math.floor(this.waveTimer / this.frequency);
    if (
      !this.ghouls.length ||
      this.ghouls[this.ghouls.length - 1].id < this.wave
    ) {
      this.make();
    }
    this.ghouls.forEach(g => g.update(dt));
  }
}
