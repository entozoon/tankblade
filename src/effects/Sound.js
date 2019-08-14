import Pixi from "../engines/Pixi";
import { enableSound, volume } from "../settings";
// import "pixi-sound";

const soundResources = {
  intro: "intro.mp3",
  bgm: "bgm.mp3",
  bounce1: "bounce1.mp3",
  bounce2: "bounce2.mp3",
  bounce3: "bounce3.mp3",
  hairy: "hairy.mp3",
  gameover: "gameover.mp3",
  won: "won.mp3"
};
class Sound {
  constructor() {
    this.disableEffects = false;
    // Cheeky sound debug url
    this.enableSound = enableSound;
    if (window.location.search === "?debug") {
      this.enableSound = false;
    }

    this.create = () =>
      new Promise(resolve => {
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
      });
  }

  music(track) {
    if (!this.enableSound || this.musicTrackPlaying === track) return;
    if (this.musicTrackPlaying) {
      this.sounds[this.musicTrackPlaying].stop();
    }
    this.musicTrackPlaying = track;
    this.sounds[track].play({ loop: true });
  }
  effect(track, options) {
    if (!this.enableSound || this.disableEffects) return;
    this.sounds[track].play(options);
  }
  stop(track) {
    if (!this.enableSound) return;
    this.sounds[track].stop();
  }
}
export default new Sound(); // Single instance
