import * as PIXI from "pixi.js";
import FontFaceObserver from "FontFaceObserver";
import { pointsText } from "../lib/text";

const fontObserver = new FontFaceObserver("uni_05_53");

class Pixi {
  constructor() {
    Object.assign(this, PIXI);

    // Sack antialiasing off with renderer settings and CSS
    this.settings.SCALE_MODE = this.SCALE_MODES.NEAREST;
    this.settings.RENDER_OPTIONS.antialias = false;
    this.settings.SORTABLE_CHILDREN = true; // Enable zIndex

    // this.settings.PRECISION_FRAGMENT = "highp"; // trying to improve text rendering

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

    // Points HUD
    fontObserver.load().then(() => {
      this.pointsText = pointsText();
      this.containerMain.addChild(this.pointsText);
    });
  }
  addBackground() {}
  render() {
    this.rendererBgBlood.render(this.containerBgBlood);
    this.rendererMain.render(this.containerMain);
  }
}
export default new Pixi(); // Single instance
