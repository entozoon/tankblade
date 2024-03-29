import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { stagesConfig } from "../settings";

const loop = (resolve, reject, stage) => () => {
  Time.update();
  Hero.update(Time.dt);
  GhoulFactory.update();
  Background.update();

  // Debug
  // console.log(GhoulFactory.ghouls.length);

  // Survived this stage
  if (Time.elapsed >= stage.survivalTime) {
    resolve();
  }
  // Overrun with ghouls
  else if (GhoulFactory.ghouls.length >= stage.ghoulCountGameOver) {
    reject("overrun");
  }
  // TyPiCaL lOoP
  else {
    Pixi.render();
    requestAnimationFrame(loop(resolve, reject, stage));
  }
};

class Stage {
  constructor(options) {
    // Destructured assignment into this, is, I mean, awful syntax..
    // ({ waveFactor: this.waveFactor } = stagesConfig[id]);
    // But then, typical assignment is still quite exhaustive..
    // So let's just pass it all in on construction and jam it in blind
    Object.assign(this, options);

    this.create = () => {
      new Promise(resolve => {
        Time.reset();
        Sound.music("bgm");
        Sound.disableEffects = false;

        // centerText.text = null;
        // scoreText.text = `${options.title} `;
        scoreText.text = null;
        centerText.text = `${options.title} `;

        // GhoulFactory.runAway();
        // setTimeout(() => {
        //   GhoulFactory.reset(options);
        //   setTimeout(() => {
        //     centerText.text = null;
        //     resolve(2);
        //   }, 2000);
        // }, 2000);

        // This block can, I mean, can be written better
        // but, it's a game jam innit!
        if (options.first) {
          // Flat ghoul reset, no runaway
          GhoulFactory.reset(options);
          setTimeout(() => {
            centerText.text = null;
            resolve();
          }, 1000);
        } else {
          // Runaway, chill, then reset ghouls
          GhoulFactory.runAway();
          setTimeout(() => {
            GhoulFactory.reset(options);
            setTimeout(() => {
              centerText.text = null;
              resolve();
            }, 1000);
          }, 1000);
        }
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
export const stages = [
  new Stage({
    title: " ROUND 1 OF " + stagesConfig.length,
    ...stagesConfig[0],
    first: true
  }),
  new Stage({
    title: " ROUND 2 OF " + stagesConfig.length,
    ...stagesConfig[1]
  }),
  new Stage({
    title: " ROUND 3 OF " + stagesConfig.length,
    ...stagesConfig[2]
  }),
  new Stage({
    title: " ROUND 4 OF " + stagesConfig.length,
    ...stagesConfig[3]
  })
];
