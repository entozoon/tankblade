import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";
import HeroSeeker from "../behaviours/HeroSeeker";
import Hurter from "../behaviours/Hurter";
import { poses } from "../poses/ghoul";

export default class {
  constructor({ id, hero, thrustPower, thrustLimit, dieGhoulFactory }) {
    this.id = id;
    this.width = 8;
    this.height = 6;
    this.dieGhoulFactory = dieGhoulFactory;
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "ghoul.png",
        poses
      }),
      new Mover({
        thrustPower,
        thrustLimit,
        decelerationSpeed: 0.0001,
        minThrust: 0.0015
      }),
      new HeroSeeker({ hero, bounceThrust: 0.05 }),
      new Hurter({
        id,
        hp: 20,
        hurtPause: 1000 + Math.random() * 2000,
        dieEntity: this.dieEntity.bind(this)
      })
    );
    this.setPosition({ x: 10, y: 50 });

    this.tint();
    this.constructed = true;
  }
  dieEntity() {
    this.dieGhoulFactory(this.id);
  }
  update(dt) {
    if (!this.constructed) return;
    this.setPose(this.hurting ? "hurting" : "default");
    this.moverUpdate(dt);
    this.heroSeekerUpdate(dt);
    this.spriteUpdate(dt);
    // debugger;
  }
}
