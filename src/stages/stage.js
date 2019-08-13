import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { stages } from "../settings";

const loop = (resolve, reject, stage) => () => {
  Time.update();
  Hero.update(Time.dt);

  GhoulFactory.update();
  Background.update();

  if (GhoulFactory.wave >= stage.wavesToSurvive) {
    resolve();
  } else if (GhoulFactory.ghouls.length >= stage.ghoulCountGameOver) {
    reject();
  } else {
    Pixi.render();
    requestAnimationFrame(loop(resolve, reject, stage));
  }
};

class Stage {
  constructor(options) {
    // Destructured assignment into this, is, I mean, awful syntax..
    // ({ waveFactor: this.waveFactor } = stages[id]);
    // But then, typical assignment is still quite exhaustive..
    // So let's just pass it all in on construction and jam it in blind
    Object.assign(this, options);

    this.create = () => {
      new Promise(resolve => {
        Time.reset();
        GhoulFactory.reset(options);
        Sound.music("bgm");
        centerText.text = null;
        scoreText.text = `${options.title} `;
        resolve();
      });
    };
  }
  loop() {
    // https://yeti.co/blog/cool-tricks-with-animating-using-requestanimationframe/#trick3promiseifyingnontimestampedanimations
    return new Promise((resolve, reject) => {
      console.log("Stage:", this.title);
      // Pass the resolve into the loop function, to be callbacked
      requestAnimationFrame(loop(resolve, reject, this));
    });
  }
}
export const stage1 = new Stage({ title: "ROUND 1", ...stages[0] });
export const stage2 = new Stage({ title: "ROUND 2", ...stages[1] });
export const stage3 = new Stage({ title: "ROUND 3", ...stages[2] });
