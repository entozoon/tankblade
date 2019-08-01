import Pixi from "./engines/Pixi";
import Hero from "./entities/Hero";

// Test text
let basicText = new Pixi.Text("Game loaded", {
  font: "bold italic 36px Arial",
  fill: "#ffffaa"
});
basicText.x = 30;
basicText.y = 90;
Pixi.stage.addChild(basicText);
Pixi.render();

const hero = new Hero();
