import Sprite from "../engines/Sprite";
// Mover and Controllable are dependant on each other (because I'm not good enough at composition yet)
import Mover from "../behaviours/Mover";
import Controllable from "../behaviours/Controllable";
import EdgeBouncer from "../behaviours/EdgeBouncer";
import Hurter from "../behaviours/Hurter";
import { poses } from "../poses/hero";

export default class {
  constructor() {
    this.width = 12;
    this.height = 6;
    this.points = 0;
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
    this.setPosition({ x: 32, y: 32 });
    this.setPose("default");

    this.constructed = true;
  }
  dieEntity() {
    console.error("Game over");
  }
  heroSeekerCollision(heroSeeker) {
    if (heroSeeker.hurting) return;
    this.points += 5; // *
    if (!this.hurting) {
      // Hacking the hurter mechanic to stop it spazzing bounce thrusts
      this.setThrust({
        y: heroSeeker.thrust.y * 10,
        x: heroSeeker.thrust.x * 10
      });
    }
    this.hurt(0);
  }
  update(dt) {
    if (!this.constructed) return;
    this.controllableUpdate(dt);
    this.moverUpdate(dt);
    this.bounceUpdate(dt);
    this.spriteUpdate(dt);
  }
}
