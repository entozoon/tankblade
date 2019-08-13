import Sound from "../effects/Sound";
import { centerText } from "../lib/text";
import { introAnimation } from "../effects/introAnimation";

export const intro = () =>
  new Promise(resolve => {
    centerText.text = "TANKBLADE";
    Sound.music("intro");
    introAnimation(centerText).then(() => {
      setTimeout(() => {
        Sound.stop("intro");
        resolve();
      }, 1000);
    });
  });
