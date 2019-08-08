import Pixi from "../engines/Pixi";
import { gettingHairyPulseSpeed } from "../config";

class Background {
  constructor() {
    this.gettingHairy = false;
    this.gettingHairyTimeout = 0;
  }
  create() {
    this.sprite = new Pixi.Sprite(new Pixi.Texture.from("bg.png"));
    // Pixi.containerBgBlood.addChild(this.sprite);
    // // this.sprite.alpha = 1; // first render
    // setTimeout(() => {
    //   Pixi.containerBgBlood.removeChild(this.sprite); // arbitrarily after first render
    // }, 500);
  }
  pulse(dt) {
    this.gettingHairyTimeout += dt;
    this.sprite.alpha = 1;
    this.sprite.tint =
      0xffffff -
      0x00ffff *
        (1 -
          Math.abs(
            (this.gettingHairyTimeout % gettingHairyPulseSpeed) * 2 -
              gettingHairyPulseSpeed
          ) /
            gettingHairyPulseSpeed);
  }
  reset() {
    // Allow it to draw fully opaquely for a short amount of time
    this.sprite.alpha = 0.1; // 1 is ideal but game load fade is nice
    this.sprite.tint = 0xffffff;
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => {
      this.sprite.alpha = 0.02; // B L O O D S L I C K
    }, 500);
  }
  update(dt, elapsed) {
    if (elapsed < 100) {
      this.reset();
    }

    if (this.gettingHairy) this.pulse(dt);

    // Optimisation - This doesn't have to be all that frequent:
    Pixi.containerBgBlood.addChild(this.sprite); // Re-add the semitransparent bg
  }
}
export default new Background(); // Single instance
