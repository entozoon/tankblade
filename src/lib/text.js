import Pixi from "../engines/Pixi";

export const pointsText = () => {
  let text = new Pixi.Text("0⭐", {
    fontFamily: '"uni_05_53", Helvetica, Arial, sans-serif',
    fontSize: 8,
    textBaseline: "alphabetic",
    fill: 0xff6600,
    dropShadow: true,
    dropShadowAngle: 0,
    dropShadowDistance: 1
  });
  text.position = { x: 64 + 1, y: 0 - 1 };
  text.anchor.set(1, 0);
  text.zIndex = 9999;
  text.alpha = 0.75;
  return text;
};
