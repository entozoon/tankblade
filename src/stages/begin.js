import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { waveChange } from "../settings";

export const begin = () => {
  Sound.music("bgm");
  centerText.text = null;
  scoreText.text = "ROUND 1 ";
  loop();
};

const loop = () => {
  Time.update();
  Hero.update(Time.dt);
  const wave = Math.floor(Time.elapsed / waveChange) + 1;
  GhoulFactory.update(Time.dt, wave);
  Background.update(Time.dt, Time.elapsed);

  Pixi.render();
  requestAnimationFrame(loop);
};
