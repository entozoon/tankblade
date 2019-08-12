import Time from "../engines/Time";
import GhoulFactory from "../engines/GhoulFactory";
import Hero from "../entities/Hero";
import Sound from "../effects/Sound";
import { centerText } from "../lib/text";

// This is triggering waaaaay too much!
export const gameOver = () => {
  console.log("gameOver");
  // Perhaps slow down the speed of bgm beforehand?
  Sound.disableEffects = true;
  Sound.music("gameover");
  centerText.text = "GAME OVER";
  setTimeout(() => {
    Time.reset();
    Hero.reset();
    GhoulFactory.reset();
    centerText.text = null;
  }, 3000);
};
