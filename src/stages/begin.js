import Pixi from "../engines/Pixi";
import Hero from "../entities/Hero";
import GhoulFactory from "../engines/GhoulFactory";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import { waveChange } from "../settings";
import { dt } from "../engines/time";

export const begin = () => {
  Sound.music("bgm");
  centerText.text = null;
  scoreText.text = "ROUND 1 ";
  loop();
};

let start = Date.now(), // <- reset to restart waves
  then = Date.now();
const loop = () => {
  const dt = Date.now() - then,
    elapsed = then - start;
  then = Date.now();

  Pixi.render();
  requestAnimationFrame(loop);
  Hero.update(dt);
  const wave = Math.floor(elapsed / waveChange) + 1;
  GhoulFactory.update(dt, wave);
  Background.update(dt, elapsed);
};
