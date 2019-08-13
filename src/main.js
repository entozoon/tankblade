import { setup } from "./stages/setup";
import { intro } from "./stages/intro";
import { stage1, stage2, stage3 } from "./stages/stage";
import { centerText } from "./lib/text";

const game = () => {
  intro()
    .then(stage1.create)
    // .then(stage1.loop)
    // ^ NGL I don't understand why I can't do this, but like
    // without running() it, it doesn't get its 'this' context
    .then(() => stage1.loop())
    .then(stage2.create)
    .then(() => stage2.loop())
    .then(stage3.create)
    .then(() => stage3.loop())
    .then(() => {
      centerText.text = "YOU WON";
      setTimeout(() => {
        game();
      }, 2000);
    })
    .catch(error => {
      centerText.text = "GAME OVER";
      console.log("Game over:", error);
      setTimeout(() => {
        game();
      }, 2000);
    });
};

// Wait until the heavens and earth are created, then fire through the stages!
setup().then(game);

// Nag Safari users, as it straight up doesn't render well enough
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
  alert(
    "Please use Chrome if possible, as the pixel rendering gets blurred on Safari."
  );
}
