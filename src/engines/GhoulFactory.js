import Ghoul from "../entities/Ghoul";

export default class {
  constructor({ frequency, hero }) {
    this.frequency = frequency;
    this.hero = hero;
    this.ghouls = [];
    this.waveTimer = 0;
  }
  dieGhoulFactory(id) {
    const dyingGhoul = this.ghouls.filter(g => g.id === id)[0];
    dyingGhoul.spriteRemove();
    this.ghouls = this.ghouls.filter(g => g.id !== id);
  }
  make() {
    this.ghouls.push(
      new Ghoul({
        id: this.wave,
        thrustPower: 0.0025 + Math.random() * 0.002,
        thrustLimit: 0.01 + Math.random() * 0.01,
        hero: {
          position: this.hero.position,
          width: this.hero.width,
          height: this.hero.height
        },
        dieGhoulFactory: this.dieGhoulFactory.bind(this)
      })
    );
  }
  update(dt) {
    this.waveTimer += dt;
    this.wave = Math.floor(this.waveTimer / this.frequency);
    if (this.ghouls.length <= this.wave) {
      this.make();
    }
    this.ghouls.forEach(g => g.update(dt));
  }
}
