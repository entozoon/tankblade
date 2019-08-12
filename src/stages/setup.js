import Sound from "../effects/Sound";
import Background from "../effects/Background";
import { centerText, scoreText } from "../lib/text";

export const setup = Promise.all([
  Sound.create(),
  Background.create(),
  centerText.create(),
  scoreText.create()
]);
