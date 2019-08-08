import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";
import { waveChange } from "./config";
import Background from "./effects/Background";
import { centerText } from "./lib/text";

// Wait until Pizi renderers are ready and fonts loaded
const readyInterval = setInterval(() => {
  if (Pixi.ready) {
    clearInterval(readyInterval);
    setup();
    setTimeout(() => {
      loop();
    }, 1000);
  }
}, 100);

const setup = () => {
  Background.create();
  centerText.text = "TANKBLADE";
};

let start = Date.now(), // <- reset to restart waves
  then = Date.now();

const gameOver = () => {
  centerText.text = "GAME OVER";
  setTimeout(() => {
    start = Date.now();
    ghoulFactory.reset();
    Hero.reset();
  }, 3000);
};

const ghoulFactory = new GhoulFactory({
  timeoutStart: 2000,
  timeoutEnd: 100,
  Hero,
  gameOver
});

var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  // document.body.classList.add("-safari");
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}

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
