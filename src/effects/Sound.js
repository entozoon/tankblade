import Pixi from "../engines/Pixi";
// import "pixi-sound";

const soundResources = {
  intro: "intro.mp3",
  bgm: "bgm.mp3",
  bounce: "bounce.mp3"
};

class Sound {
  constructor() {
    this.create =
  }
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
          this.sounds[track] = resources[track].sound;
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
  play(track) {
    this.sounds[track].play();
  }
}
export default new Sound(); // Single instance
