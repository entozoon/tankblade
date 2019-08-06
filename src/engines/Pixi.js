import * as PIXI from "pixi.js";

class Pixi {
  constructor() {
    Object.assign(this, PIXI);

    this.renderer = this.autoDetectRenderer({
      width: 64,
      height: 64,
      antialias: false,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x222222
      // preserveDrawingBuffer: true,
      // clearBeforeRender: false
    });

    // Sack antialiasing off with renderer settings and CSS
    this.settings.SCALE_MODE = this.SCALE_MODES.NEAREST;
    this.settings.RENDER_OPTIONS.antialias = false;
    this.settings.SORTABLE_CHILDREN = true; // Enable zIndex

    document.getElementById("game").appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    // Background
    const bg = new PIXI.Sprite(new PIXI.Texture.from("bg.png"));
    this.stage.addChild(bg);
  }
  render() {
    // Re-render the main stage
    this.renderer.render(this.stage);
  }
}

export default new Pixi(); // Single instance
