import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import { gettingHairyPulseSpeed } from "../settings";
import Sound from "../effects/Sound";

class Background {
  constructor() {
    this.gettingHairy = false;
    this.gettingHairyStore = false;
    this.gettingHairyTimeout = 0;

    this.create = () =>
      new Promise(resolve => {
        this.sprite = new Pixi.Sprite(new Pixi.Texture.from("bg.png"));
        // Pixi.containerBgBlood.addChild(this.sprite);
        // // this.sprite.alpha = 1; // first render
        // setTimeout(() => {
        //   Pixi.containerBgBlood.removeChild(this.sprite); // arbitrarily after first render
        // }, 500);
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

    // let colorMatrix = new Pixi.ColorMatrixFilter();
    // Pixi.containerMain.filters = [colorMatrix];
    // colorMatrix.brightness(0.1);

    const fadeTints = [
      0xffffff,
      0xeeeeee,
      0xdddddd,
      0xcccccc,
      0xbbbbbb,
      0xaaaaaa,
      0x999999,
      0x888888,
      0x777777,
      0x666666,
      0x555555,
      0x444444,
      0x333333,
      0x222222,
      0x111111,
      0x000000
    ];
    let i = 0;
    const cheekyFade = setInterval(() => {
      this.sprite.tint = fadeTints[i];
      console.log(i);
      Pixi.render();
      i++;
      if (i >= fadeTints.length) clearInterval(cheekyFade);
    }, 200);

    // var filter = new Pixi.ColorMatrixFilter();
    // filter.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    // stage.filters = [filter];
    // console.log(this.sprite);
    // this.sprite.brightness = 0.1;
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
