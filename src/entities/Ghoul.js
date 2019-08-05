import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";
import HeroSeeker from "../behaviours/HeroSeeker";
import Hurter from "../behaviours/Hurter";
import { poses } from "../poses/ghoul";

export default class {
  constructor({ hero }) {
    this.width = 8;
    this.height = 6;
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "ghoul.png",
        poses
      }),
      new Mover({
        thrustPower: 0.003,
        thrustLimit: 0.015,
        decelerationSpeed: 0.0001,
        minThrust: 0.001
      }),
      new HeroSeeker({ hero, bounceThrust: 0.05 }),
      new Hurter({ hp: 20 })
    );
    this.setPosition({ x: 10, y: 50 });

    this.pose("default");
    this.tint();
    this.constructed = true;
  }
  update(dt) {
    if (!this.constructed) return;
    this.moverUpdate(dt);
    this.heroSeekerUpdate(dt);
    this.spriteUpdate(dt);
    // debugger;
  }
}
