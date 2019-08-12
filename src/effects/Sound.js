import Pixi from "../engines/Pixi";
import { enableSound, volume } from "../settings";
// import "pixi-sound";

const soundResources = {
  intro: "intro.mp3",
  bgm: "bgm.mp3",
  bounce1: "bounce1.mp3",
  bounce2: "bounce2.mp3",
  bounce3: "bounce3.mp3",
  hairy: "hairy.mp3"
};

class Sound {
  constructor() {}
  create() {
    return new Promise(resolve => {
      // Initialise sound loader
      for (let r in soundResources) {
        Pixi.Loader.shared.add(r, soundResources[r]);
      }

      // Fire up the loader, creating usable sounds object
      this.sounds = {};
      Pixi.Loader.shared.load((loader, resources) => {
        for (let track in resources) {
          let sound = resources[track].sound;
          sound.volume = volume;
          this.sounds[track] = sound;
        }
        resolve("Sound loaded");
      });

      // Pixi.sound.Sound.from({
      //   url: "bgm.wav",
      //   preload: true,
      //   loop: true,
      //   loaded: (err, sound) => {
      //     // sound.play();
      //   }
      // });
    });
  }
  play(track, options) {
    if (enableSound) {
      this.sounds[track].play(options);
    }
  }
  stop(track) {
    if (enableSound) {
      this.sounds[track].stop();
    }
  }
}
export default new Sound(); // Single instance
