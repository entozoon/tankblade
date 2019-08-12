import Pixi from "../engines/Pixi";

export const introAnimation = text =>
  new Promise(resolve => {
    const animation = () => {
      text.scale = {
        x: 50 - a,
        y: 50 - a
      };
      Pixi.render(); // always remember to render!
      let id = requestAnimationFrame(animation);
      if (a >= 49) {
        cancelAnimationFrame(id);
        setTimeout(() => {
          resolve();
        }, 1000);
      }
      a++;
    };
    let a = 0;
    requestAnimationFrame(animation);
  });
