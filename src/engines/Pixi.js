import * as PIXI from "pixi.js";

class Pixi {
  constructor() {
    Object.assign(this, PIXI);

    // Sack antialiasing off with renderer settings and CSS
    this.settings.SCALE_MODE = this.SCALE_MODES.NEAREST;
    this.settings.RENDER_OPTIONS.antialias = false;
    this.settings.SORTABLE_CHILDREN = true; // Enable zIndex

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
      // backgroundColor: 0x222222,
      transparent: true
    });

    document.getElementById("game").appendChild(this.rendererBgBlood.view);
    document.getElementById("game").appendChild(this.rendererMain.view);

    this.containerBgBlood = new PIXI.Container();
    this.containerMain = new PIXI.Container();

    // Background
    this.bg = new PIXI.Sprite(new PIXI.Texture.from("bg.png"));

    this.containerBgBlood.addChild(this.bg);
    this.bg.alpha = 1;
    setTimeout(() => {
      this.containerBgBlood.removeChild(this.bg); // after first render
      this.bg.alpha = 0.02; // bloodslick
    }, 500);
  }
  render() {
    this.containerBgBlood.addChild(this.bg);
    this.rendererBgBlood.render(this.containerBgBlood);
    this.rendererMain.render(this.containerMain);
  }
}

export default new Pixi(); // Single instance
