import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import Bloodener from "../effects/Bloodener";
import Hero from "../entities/Hero";

// Let there be firmaments, sound etc
export const setup = () =>
  new Promise(resolve => {
    Pixi.create()
      .then(Sound.create)
      .then(Background.create)
      .then(Bloodener.create)
      .then(Hero.create)
      .then(() => centerText.create())
      .then(() => scoreText.create())
      .then(() => resolve());
  });
