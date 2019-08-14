import Background from "../effects/Background";
import Sound from "../effects/Sound";
import { centerText } from "../lib/text";

export const gameOver = reason => {
  console.log("Game over: " + reason);
  // Perhaps slow down the speed of bgm beforehand?
  Sound.disableEffects = true;
  Sound.music("gameover");
  Background.darken();
  centerText.text = "GAME OVER";
  // Can't really have legit framed animation here or anything, without a proper created class, with update and it's not worth it (yet)
};
