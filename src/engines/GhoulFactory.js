import Time from "../engines/Time";
import Ghoul from "../entities/Ghoul";
import Hero from "../entities/Hero";
import { constrain } from "../lib/utilities";
import { randomOutsidePerimeter } from "../lib/utilities";
import Background from "../effects/Background";

class GhoulFactory {
  constructor({ timeoutStart, timeoutEnd, gameOver }) {
    this.timeout = timeoutStart;
    this.timeoutEnd = timeoutEnd;
    this.ghouls = [];
    // this.waveTimer = 0;
    this.makeCount = 0;
    this.makeTimeout = 0;
    this.gettingHairy = () => this.ghouls.length > this.ghoulCountGettingHairy;
    this.gettingHairyChanging = false;
    this.ghoulCountGettingHairy;
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
  runAway() {
    // Whip out a can of hurt on dems ghouls
    this.ghouls.forEach(g => {
      g.thrustAway(Hero);
      g.hurt(100);
    });
  }
  reset(settings) {
    Object.assign(this, settings);
    this.ghouls.forEach(g => {
      g.spriteRemove();
    });
    this.ghouls = [];
  }
  get wave() {
    return Math.floor(Time.elapsed / this.waveChange) + 1;
  }
  makeFrequency() {
    return constrain(5000 - (Math.pow(this.wave, 0.1) - 1) * 20000, 50);
  }
  update() {
    // Create ghouls, at an appropriate speed
    // (turns out, having a natural feeling wave of baddiez isn't easy..)
    this.makeTimeout += Time.dt;
    if (!this.ghouls.length || this.makeTimeout > this.makeFrequency()) {
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
    this.ghouls.forEach(g => g.update(Time.dt));
  }
}
export default new GhoulFactory({
  timeoutStart: 2000,
  timeoutEnd: 100,
  Hero
});
