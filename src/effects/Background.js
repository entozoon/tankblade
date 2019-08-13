import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import { gettingHairyPulseSpeed } from "../settings";
import Sound from "../effects/Sound";
import { decToHex } from "../lib/utilities";

class Background {
  constructor() {
    this.gettingHairy = false;
    this.gettingHairyStore = false;
    this.gettingHairyTimeout = 0;

    this.create = () =>
      new Promise(resolve => {
        this.sprite = new Pixi.Sprite(new Pixi.Texture.from("bg.png"));
        resolve();
      });
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
  darken() {
    this.sprite.alpha = 1;
    let i = 255;
    const cheekyFade = setInterval(() => {
      this.sprite.tint = `0x${decToHex(i)}${decToHex(i)}${decToHex(i)}`;
      Pixi.render();
      i -= 5;
      if (i <= 100) clearInterval(cheekyFade);
    }, 100);
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
  update() {
    if (Time.elapsed < 100) {
      this.reset();
    }
    // Continous
    if (this.gettingHairy) {
      this.pulse(Time.dt);
    }
    // Instantaneous
    if (this.gettingHairy != this.gettingHairyStore) {
      this.gettingHairyStore = this.gettingHairy;
      if (this.gettingHairy) {
        Sound.music("hairy");
      } else {
        Sound.music("bgm");
      }
    }

    // Optimisation - This doesn't have to be all that frequent:
    Pixi.containerBgBlood.addChild(this.sprite); // Re-add the semitransparent bg
  }
}
export default new Background(); // Single instance
