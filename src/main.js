import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";
import { waveChange } from "./settings";
import Background from "./effects/Background";
import { introAnimation } from "./effects/introAnimation";
import { centerText, scoreText } from "./lib/text";
import Sound from "./effects/Sound";

// Wait until Pixi renderers are ready and fonts loaded
Pixi.create().then(() => {
  setup.then(intro).then(begin);
});

const setup = Promise.all([
  Sound.create(),
  Background.create(),
  centerText.create(),
  scoreText.create()
]);

const intro = () =>
  new Promise(resolve => {
    centerText.text = "TANKBLADE";
    Sound.music("intro");
    introAnimation(centerText).then(() => {
      Sound.stop("intro");
      resolve();
    });
  });

// This is triggering waaaaay too much!
const gameOver = () => {
  // Perhaps slow down the speed of bgm beforehand?
  Sound.disableEffects = true;
  Sound.music("gameover");
  centerText.text = "GAME OVER";
  setTimeout(() => {
    start = Date.now();
    ghoulFactory.reset();
    Hero.reset();
    centerText.text = null;
  }, 3000);
};

const ghoulFactory = new GhoulFactory({
  timeoutStart: 2000,
  timeoutEnd: 100,
  Hero,
  gameOver
});

const begin = () => {
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
  ghoulFactory.update(dt, wave);
  Background.update(dt, elapsed);
};

// Nag Safari users, as it straight up doesn't render well enough
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}
