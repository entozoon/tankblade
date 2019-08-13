import Time from "../engines/Time";
import Bloodener from "../effects/Bloodener";
import Hero from "../entities/Hero";

export default class {
  constructor({ id, hp, dieEntity, hurtPause }) {
    this.hp = hp;
    this.dieEntity = dieEntity;
    this.hurtPause = hurtPause;
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
    if (!Hero || this.hurting) return;

    // console.time();
    for (let i = 0; i < 25; ++i) {
      const blood = Bloodener.newBlood(this.position, Hero.position);
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
  hurterUpdate() {
    // this.bloods.forEach((blood, i) => {
    for (let i = 0; i < this.bloods.length; i++) {
      const blood = this.bloods[i];
      let dec = blood.lifeFactor - 0.7;
      dec = dec < 0 ? 0 : dec;
      blood.x += blood.thrust.x * this.bloodThrustSpeed * Time.dt * dec;
      blood.y += blood.thrust.y * this.bloodThrustSpeed * Time.dt * dec;
      blood.alpha = blood.lifeFactor;
      blood.lifeFactor -= Time.dt / blood.lifespan;
      blood.lifeFactor = blood.lifeFactor < 0 ? 0 : blood.lifeFactor;
    }
  }
}
