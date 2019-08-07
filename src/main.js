import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";

const waveChange = 4000;
let start = Date.now(), // <- reset to restart game
  then = Date.now();

const hero = new Hero();
const ghoulFactory = new GhoulFactory({
  timeoutStart: 2000,
  timeoutEnd: 100,
  hero
});

// Shove a temporary class on game for dev reasons
document
  .getElementById("game")
  .classList.add(
    window.location.hostname === "localhost" ? "-localhost" : null
  );

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
