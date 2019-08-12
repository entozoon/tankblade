import Pixi from "../engines/Pixi";
import Sprite from "../engines/Sprite";
// Mover and Controllable are dependant on each other (because I'm not good enough at composition yet)
import Mover from "../behaviours/Mover";
import Controllable from "../behaviours/Controllable";
import EdgeBouncer from "../behaviours/EdgeBouncer";
import Hurter from "../behaviours/Hurter";
import { poses } from "../poses/hero";
import { scoreText } from "../lib/text";
import Sound from "../effects/Sound";

class Hero {
  create() {
    return new Promise(resolve => {
      this.width = 12;
      this.height = 6;
      this.score = 0;
      Object.assign(
        this,
        new Sprite({
          spriteSheet: "hero.png",
          poses
        }),
        new Mover({
          thrustPower: 0.01,
          thrustLimit: 0.1,
          decelerationSpeed: 0.0002,
          minThrust: 0.001
        }),
        new Hurter({
          id: -1,
          hp: 100,
          hurtPause: 100,
          dieEntity: this.dieEntity.bind(this)
        }),
        new EdgeBouncer(),
        new Controllable()
      );
      // this.setThrust = this.setThrust;
      this.setPosition({ y: 32, x: 32 });
      this.setPose("default");
      this.constructed = true;
      resolve();
    });
  }
  dieEntity() {
    // Can't currently get hurt, as such, so..
  }
  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
    // Also update the scoreText sprite
    scoreText.text = `${value}⭐`;
  }
  seekerCollision(seeker) {
    if (seeker.hurting) return;

    // bounce1,2,3 randomly with an even distrubution
    // On reflection, I'm not keep on bounce3..
    Sound.effect(`bounce${Math.floor(Math.random() * 2) + 1}`);

    this.score += 1; // *

    if (!this.hurting) {
      // Hacking the hurter mechanic to stop it spazzing bounce thrusts
      // (that's what she said)
      this.setThrust({
        x: seeker.thrust.x * 2,
        y: seeker.thrust.y * 2
      });
    }
    this.hurt(0);
  }
  reset() {
    this.score = 0;
    this.hp = 100;
  }
  update(dt) {
    if (!this.constructed) return;
    this.controllableUpdate(dt);
    this.moverUpdate(dt);
    this.bounceUpdate(dt);
    this.spriteUpdate(dt);
    this.hurterUpdate(dt);
  }
}
export default new Hero();
