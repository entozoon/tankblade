import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";
import Ghoul from "./entities/Ghoul";

const hero = new Hero();
const ghoul = new Ghoul({
  hero: {
    position: hero.position,
    width: hero.width,
    height: hero.height
  }
});

// const ghoulFactory = () = { // ...  }

let then = Date.now();
const loop = () => {
  let dt = Date.now() - then;
  then = Date.now();

  Pixi.render();
  requestAnimationFrame(loop);
  hero.update(dt);
  ghoul.update(dt);
};
loop();
