import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { waveChange } from "../settings";

const loop = () => {
  console.log("stage loop");
  Time.update();
  // console.log("dt", Time.dt, "elapsed", Time.elapsed);
  Hero.update(Time.dt);
  const wave = Math.floor(Time.elapsed / waveChange) + 1;
  // console.log("wave", wave);
  GhoulFactory.update(Time.dt, wave);
  Background.update(Time.dt, Time.elapsed);

  Pixi.render();
  requestAnimationFrame(loop);
};

class Stage {
  constructor(props) {
    Object.assign(this, props);

    this.create = () =>
      new Promise(resolve => {
        Sound.music("bgm");
        centerText.text = null;
        scoreText.text = `${this.name} `;
        this.loop();
        resolve();
      });
  }
  loop() {
    loop();
  }
}

export const stage1 = new Stage({ name: "ROUND 1" });
