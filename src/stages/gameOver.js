import Sound from "../effects/Sound";
import GhoulFactory from "../engines/GhoulFactory";
import { centerText } from "../lib/text";
import { introAnimation } from "../effects/introAnimation";

// This is triggering waaaaay too much!
export const gameOver = () => {
  // Perhaps slow down the speed of bgm beforehand?
  Sound.disableEffects = true;
  Sound.music("gameover");
  centerText.text = "GAME OVER";
  setTimeout(() => {
    start = Date.now();
    GhoulFactory.reset();
    Hero.reset();
    centerText.text = null;
  }, 3000);
};
