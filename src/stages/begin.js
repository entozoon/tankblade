import Sound from "../effects/Sound";
import { centerText } from "../lib/text";

export const begin = () => {
  Sound.music("bgm");
  centerText.text = null;
  scoreText.text = "ROUND 1 ";
  loop();
};
