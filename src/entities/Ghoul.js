import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";
import HeroSeeker from "../behaviours/HeroSeeker";
import Hurter from "../behaviours/Hurter";
import { poses } from "../poses/ghoul";

export default class {
  constructor({
    id,
    hp,
    position,
    thrustPower,
    thrustLimit,
    hero,
    dieAtTheGhoulFactory
  }) {
    this.id = id;
    this.width = 8;
    this.height = 6;
    this.dieAtTheGhoulFactory = dieAtTheGhoulFactory;
    this.hero = hero;
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
        minThrust: 0.004
      }),
      new HeroSeeker({ hero, bounceThrust: 0.05 }),
      new Hurter({
        id,
        hp,
        hurtPause: 1000 + Math.random() * 2000,
        dieEntity: this.dieEntity.bind(this),
        hero
      })
    );
    this.setPosition(position);

    this.tint();
    this.constructed = true;
  }
  setBodyLanguage({ target }) {
    if (this.hurting) {
      this.setPose("hurting");
    } else if (Math.abs(this.position.y - target.position.y) > 2) {
      // Stop spazzing ^
      this.setPose(this.thrust.y > 0 ? "default" : "back");
      console.log(Math.abs(this.position.y - target.position.y));
    } else {
      // Stop spazzing to face up/down
      if (
        Math.abs(this.position.y - (target.position.y + this.targetOffset.y)) >
        1
      ) {
        this.setPose("default");
      }
    }
    this.setDirectionX({ target });
  }
  setDirectionX({ target }) {
    let dir = Math.sign(this.thrust.x);
    // Stop spazzing to face left/right
    if (
      Math.abs(this.position.x - (target.position.x + this.targetOffset.x)) < 1
    )
      return;
    this.spriteDirectionX(dir);
  }
  dieEntity() {
    this.dieAtTheGhoulFactory(this.id);
  }
  update(dt) {
    if (!this.constructed) return;
    this.setBodyLanguage({ target: this.hero });
    this.moverUpdate(dt);
    this.heroSeekerUpdate(dt);
    this.spriteUpdate(dt);
    this.hurterUpdate(dt);
    // debugger;
  }
}
