import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";
import { waveChange } from "./config";
import Background from "./effects/Background";
import { centerText, scoreText } from "./lib/text";

// Wait until Pizi renderers are ready and fonts loaded
const readyInterval = setInterval(() => {
  if (Pixi.ready) {
    clearInterval(readyInterval);
    setup();
    intro();
    setTimeout(() => {
      begin();
    }, 2000);
  }
}, 100);

const setup = () => {
  Background.create();
  centerText.create();
  scoreText.create();
};

let a = 0; // Avoids clasing up, simple way to whip up anims
const oneShotAnimation = () => {
  a++;
  let id = requestAnimationFrame(oneShotAnimation);
  centerText.scale = {
    x: 50 - a,
    y: 50 - a
  };
  Pixi.render();
  if (a >= 49) cancelAnimationFrame(id);
};

const intro = () => {
  centerText.text = "TANKBLADE";
  oneShotAnimation();
};

const gameOver = () => {
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
  centerText.text = null;
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
