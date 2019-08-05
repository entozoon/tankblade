import Sprite from "../engines/Sprite";
// Mover and Controllable are dependant on each other (because I'm not good enough at composition yet)
import Mover from "../behaviours/Mover";
import Controllable from "../behaviours/Controllable";
import EdgeBouncer from "../behaviours/EdgeBouncer";
import { poses } from "../poses/hero";

export default class {
  constructor() {
    this.width = 12;
    this.height = 6;
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
      new EdgeBouncer(),
      new Controllable()
    );

    this.setPosition({ x: 32, y: 32 });
    this.setPose("default");

    this.constructed = true;
  }
  update(dt) {
    if (!this.constructed) return;
    this.controllableUpdate(dt);
    this.moverUpdate(dt);
    this.bounceUpdate(dt);
    this.spriteUpdate(dt);
  }
}
