import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { waveChange, ghoulCountGameOver } from "../settings";

const loop = (resolve, reject) => {
  return () => {
    Time.update();
    Hero.update(Time.dt);
    const wave = Math.floor(Time.elapsed / waveChange) + 1;
    GhoulFactory.update(Time.dt, wave);
    Background.update(Time.dt, Time.elapsed);

    if (wave >= 4) {
      resolve();
    } else if (GhoulFactory.ghouls.length >= ghoulCountGameOver) {
      reject();
    } else {
      Pixi.render();
      requestAnimationFrame(loop(resolve, reject));
    }
  };
};

class Stage {
  constructor(props) {
    Object.assign(this, props);

    this.create = () =>
      new Promise(resolve => {
        console.log("Creating stage", this.name);
        Time.reset();
        Sound.music("bgm");
        centerText.text = null;
        scoreText.text = `${this.name} `;
        resolve();
      });
  }
  loop() {
    // https://yeti.co/blog/cool-tricks-with-animating-using-requestanimationframe/#trick3promiseifyingnontimestampedanimations
    return new Promise((resolve, reject) => {
      // Pass the resolve into the loop function, to be callbacked
      requestAnimationFrame(loop(resolve, reject));
    });
  }
}
export const stage1 = new Stage({ name: "ROUND 1" });
export const stage2 = new Stage({ name: "ROUND 2" });
