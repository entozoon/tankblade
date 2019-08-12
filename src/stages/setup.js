import Pixi from "../engines/Pixi";
import Time from "../engines/Time";
import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";
import Bloodener from "../effects/Bloodener";
import Hero from "../entities/Hero";

// Let there be time, a firmament, sound etc
// export const setup = () =>
//   new Promise(resolve => {
//     Promise.all([
//       Pixi.create(),
//       // Time.create(), // constructs instead
//       Sound.create(),
//       Background.create(),
//       Bloodener.create(),
//       Hero.create(),
//       centerText.create(),
//       scoreText.create()
//     ]);
//   });

// export const setup = new Promise(resolve => {
//   Promise.all([
//     Pixi.create(),
//     // Time.create(), // constructs instead
//     Sound.create(),
//     Background.create(),
//     Bloodener.create(),
//     Hero.create(),
//     centerText.create(),
//     scoreText.create()
//   ]).then(resolve);
// });

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
