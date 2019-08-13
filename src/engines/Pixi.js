import * as PIXI from "pixi.js";

import pixiSound from "pixi-sound";

class Pixi {
  create() {
    return new Promise(resolve => {
      Object.assign(this, PIXI);
      this.utils.skipHello();

      this.sound = pixiSound;

      // Sack antialiasing off with renderer settings and CSS
      this.settings.SCALE_MODE = this.SCALE_MODES.NEAREST;
      this.settings.RENDER_OPTIONS.antialias = false;
      this.settings.SORTABLE_CHILDREN = true; // Enable zIndex

      this.settings.PRECISION_FRAGMENT = "highp"; // trying to improve text rendering

      this.rendererBgBlood = this.autoDetectRenderer({
        width: 64,
        height: 64,
        antialias: false,
        resolution: 1,
        backgroundColor: 0x222222,
        transparent: false,
        preserveDrawingBuffer: true,
        clearBeforeRender: false
      });
      this.rendererMain = this.autoDetectRenderer({
        width: 64,
        height: 64,
        antialias: false,
        resolution: 1,
        transparent: true
      });

      document.getElementById("game").appendChild(this.rendererBgBlood.view);
      document.getElementById("game").appendChild(this.rendererMain.view);

      this.containerBgBlood = new PIXI.Container();
      this.containerMain = new PIXI.Container();

      resolve();
    });
  }
  addBackground() {}
  render() {
    this.rendererBgBlood.render(this.containerBgBlood);
    this.rendererMain.render(this.containerMain);
  }
}
export default new Pixi(); // Single instance
