import * as PIXI from "pixi.js";

class Pixi {
  constructor() {
    Object.assign(this, PIXI);

    this.renderer = this.autoDetectRenderer(600, 400, {
      antialias: false,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x000000
    });

    // Sack antialiasing off with renderer settings and CSS
    this.settings.SCALE_MODE = this.SCALE_MODES.NEAREST;
    this.settings.RENDER_OPTIONS.antialias = false;

    document.getElementById("game").appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
  }
  render() {
    // Re-render the main stage
    this.renderer.render(this.stage);
  }
  foo() {
    return "bar";
  }
}

export default new Pixi();
