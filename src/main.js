import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import Ghoul from "./entities/Ghoul";

const hero = new Hero();
const ghoul = new Ghoul();

// const ghoulFactory = () = { // ...  }

const loop = () => {
  Pixi.render();
  requestAnimationFrame(loop);
  hero.update();
  ghoul.update();
};
loop();
