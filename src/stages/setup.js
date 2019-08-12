import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import Bloodener from "../effects/Bloodener";
import Hero from "../entities/Hero";

// Let there be time, a firmament, sound etc
export const setup = () =>
  Promise.all([
    Pixi.create(),
    Time.create(),
    Sound.create(),
    Background.create(),
    Bloodener.create(),
    Hero.create(),
    centerText.create(),
    scoreText.create()
  ]);
