import Background from "../effects/Background";
import Sound from "../effects/Sound";
import { centerText } from "../lib/text";

export const won = () => {
  Sound.disableEffects = true;
  Sound.music("won");
  Background.darken();
  centerText.text = "YOU WON";
};
