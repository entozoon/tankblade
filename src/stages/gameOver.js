import Time from "../engines/Time";
import GhoulFactory from "../engines/GhoulFactory";
import Hero from "../entities/Hero";
import Background from "../effects/Background";
import Sound from "../effects/Sound";
import { centerText } from "../lib/text";

// This is triggering waaaaay too much! There can be only one! trust
export const gameOver = () => {
  console.log("gameOver");
  // Perhaps slow down the speed of bgm beforehand?
  Sound.disableEffects = true;
  Sound.music("gameover");
  Background.reset();
  centerText.text = "GAME OVER";
  Time.pause = true;
  setTimeout(() => {
    Time.reset();
    Hero.reset();
    GhoulFactory.reset();
    centerText.text = null;
  }, 3000);
};
