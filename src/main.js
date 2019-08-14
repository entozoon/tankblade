import { setup } from "./stages/setup";
import { intro } from "./stages/intro";
import { stages } from "./stages/stage";
import { gameOver } from "./stages/gameOver";
import { won } from "./stages/won";

const game = () => {
  intro()
    .then(stages[0].create)
    .then(() => stages[0].loop())
    .then(stages[1].create)
    .then(() => stages[1].loop())
    .then(stages[2].create)
    .then(() => stages[2].loop())
    .then(stages[3].create)
    .then(() => stages[3].loop())
    // ^ .then(stages[3].loop)
    // ^ NGL I don't understand why I can't do this, but like
    // without running() it, it doesn't get its 'this' context
    .then(() => {
      won();
      setTimeout(() => {
        game();
      }, 8000);
    })
    .catch(reason => {
      gameOver(reason);
      setTimeout(() => {
        game();
      }, 7800);
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
