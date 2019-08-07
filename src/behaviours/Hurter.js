import Pixi from "../engines/Pixi";
import Bloodener from "../effects/Bloodener";

export default class {
  constructor({ id, hp, dieEntity, hurtPause, hero }) {
    this.hp = hp;
    this.dieEntity = dieEntity;
    this.hurtPause = hurtPause;
    this.hero = hero;
    this.die = this.die;
    this.bleed = this.bleed;
    this.hurt = this.hurt;
    this.hurterUpdate = this.hurterUpdate;
    this.hurting = false;
    this.bloods = [];
    this.bloodThrustSpeed = 0.007;
  }
  die() {
    this.dieEntity();
  }
  bleed() {
    if (!this.hero || this.hurting) return;

    // console.time();
    for (let i = 0; i < 25; ++i) {
      const blood = Bloodener.newBlood(this.position, this.hero.position);
      this.bloods.push(blood);
      setTimeout(() => {
        Bloodener.particleContainer.removeChild(blood);
      }, blood.lifespan);
    }
    // console.timeEnd();

    setTimeout(() => {
      this.bloods = [];
    }, 2600);
  }
  hurt(value) {
    this.hp -= value;
    this.bleed();
    this.hurting = true;
    clearTimeout(this.hurtingTimeout);
    if (this.hp <= 0) {
      setTimeout(() => {
        this.die();
      }, 1000);
    } else {
      this.hurtingTimeout = setTimeout(() => {
        this.hurting = false;
      }, this.hurtPause);
    }
  }
  hurterUpdate(dt) {
    // this.bloods.forEach((blood, i) => {
    for (let i = 0; i < this.bloods.length; i++) {
      const blood = this.bloods[i];
      let dec = blood.lifeFactor - 0.7;
      dec = dec < 0 ? 0 : dec;
      blood.x += blood.thrust.x * this.bloodThrustSpeed * dt * dec;
      blood.y += blood.thrust.y * this.bloodThrustSpeed * dt * dec;
      blood.alpha = blood.lifeFactor;
      blood.lifeFactor -= dt / blood.lifespan;
      blood.lifeFactor = blood.lifeFactor < 0 ? 0 : blood.lifeFactor;
    }
  }
}
