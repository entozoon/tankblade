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
      let blood = Pixi.Sprite.from("blood.png");
      // Gotta make some optimisations somehow..
      const r1 = Math.random(),
        r2 = Math.random();
      blood.y = this.position.y;
      blood.x = this.position.x;
      blood.thrust = {
        y:
          r1 * 6 * Math.sign(r1 - 0.5) +
          r2 * 3 * (this.position.y - this.hero.position.y),
        x:
          r2 * 6 * Math.sign(r2 - 0.5) +
          r1 * 3 * (this.position.x - this.hero.position.x)
      };
      blood.tint = 0x333333 + r1 * 0x999999;
      blood.scale.y = 0.2 + r1 * 0.5;
      blood.scale.x = 0.2 + r2 * 0.5;
      blood.lifespan = 750 + r2 * 1250;
      blood.lifeFactor = 1;
      // blood.zIndex = 1000;
      Bloodener.particleContainer.addChild(blood);
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
      blood.y += blood.thrust.y * this.bloodThrustSpeed * dt * dec;
      blood.x += blood.thrust.x * this.bloodThrustSpeed * dt * dec;
      blood.alpha = blood.lifeFactor;
      blood.lifeFactor -= dt / blood.lifespan;
      blood.lifeFactor = blood.lifeFactor < 0 ? 0 : blood.lifeFactor;
    }
  }
}
