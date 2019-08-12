import Pixi from "./engines/Pixi";
import { setup } from "./stages/setup";
import { intro } from "./stages/intro";
import { begin } from "./stages/begin";

// Wait until Pixi renderers are ready, then fire through the stages!
Pixi.create()
  .then(setup)
  .then(intro)
  .then(begin); // change to stage(1)

// Nag Safari users, as it straight up doesn't render well enough
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}
