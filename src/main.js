import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";
import { waveChange } from "./config";

let start = Date.now(), // <- reset to restart waves
  then = Date.now();

const gameOver = () => {
  console.error("Game over..");
  start = Date.now();
  ghoulFactory.reboot();
};
setTimeout(() => {
  console.log("(Automatic gameover after 60 seconds for testing!)");
  gameOver();
}, 60000);

const hero = new Hero();
const ghoulFactory = new GhoulFactory({
  timeoutStart: 2000,
  timeoutEnd: 100,
  hero,
  gameOver
});

// Shove a temporary class on game for dev reasons
document
  .getElementById("game")
  .classList.add(
    window.location.hostname === "localhost" ? "-localhost" : null
  );

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
  hero.update(dt);
  const wave = Math.floor(elapsed / waveChange) + 1;
  ghoulFactory.update(dt, wave);
};
loop();
