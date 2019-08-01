import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";

const hero = new Hero();

const loop = () => {
  Pixi.render();
  requestAnimationFrame(loop);
  hero.update();
};
loop();
