import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import GhoulFactory from "./engines/GhoulFactory";

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

let then = Date.now();
const loop = () => {
  let dt = Date.now() - then;
  then = Date.now();

  Pixi.render();
  requestAnimationFrame(loop);
  hero.update(dt);
  ghoulFactory.update(dt);
};
loop();
