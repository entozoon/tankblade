import Pixi from "./engines/Pixi";
import { setup } from "./stages/setup";
import { intro } from "./stages/intro";
import { stage1, stage2 } from "./stages/stage";

// Wait until Pixi renderers are ready, then fire through the stages!
Pixi.create()
  .then(setup)
  .then(intro)
  // .then(begin); // changing to stage(1)
  .then(stage1.create)
  .then(stage1.loop)
  .then(stage2.create)
  .then(stage2.loop)
  .catch(error => {
    console.log("game is teh over", error);
  });

// Nag Safari users, as it straight up doesn't render well enough
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}
