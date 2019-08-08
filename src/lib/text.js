import Pixi from "../engines/Pixi";

class Text {
  get text() {
    return (this._text && this._text.text) || this.default;
  }
  set text(string) {
    if (this._text) this._text.text = string;
  }
}

class ScoreText extends Text {
  constructor() {
    super();
    this.default = "0⭐";
  }
  // After fonts are loaded..
  create() {
    this._text = new Pixi.Text(this.text, {
      fontFamily: '"uni_05_53", Helvetica, Arial, sans-serif',
      fontSize: 8,
      textBaseline: "alphabetic",
      fill: 0xff6600,
      dropShadow: true,
      dropShadowAngle: 0.6,
      dropShadowBlur: 2,
      dropShadowDistance: 1
    });
    this._text.position = { x: 64 + 1, y: 0 - 1 };
    this._text.anchor.set(1, 0);
    this._text.zIndex = 999;
    this._text.alpha = 0.75;
    Pixi.containerMain.addChild(this._text);
  }
}
export const scoreText = new ScoreText();

class CenterText extends Text {
  constructor() {
    super();
    this.default = "";
  }
  // After fonts are loaded..
  create() {
    this._text = new Pixi.Text(this.text, {
      fontFamily: '"uni_05_53", Helvetica, Arial, sans-serif',
      fontSize: 8,
      textBaseline: "alphabetic",
      fill: ["#ff6600", "white", "white", "#ff2200"],
      fillGradientType: 1,
      strokeThickness: 2,
      stroke: "#000000",
      dropShadow: true,
      dropShadowAngle: 1,
      dropShadowBlur: 2,
      dropShadowDistance: 1
    });
    this._text.position = { x: 32, y: 32 };
    this._text.anchor.set(0.5, 0.5);
    this._text.zIndex = 999;
    this._text.alpha = 0.75;
    Pixi.containerMain.addChild(this._text);
  }
}
export const centerText = new CenterText();
