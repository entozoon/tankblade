import Pixi from "../engines/Pixi";
import Sprite from "../engines/Sprite";
import Entity from "../engines/Entity";

export default class extends Entity {
  constructor() {
    super();

    this.x = 2;

    console.log(this.x);

    this.position = {
      x: 300,
      y: 300
    };
    const basicText = new PIXI.Text("Created a ghoul", {
      fill: "#dddddd"
    });
    basicText.x = 30;
    basicText.y = 150;
    Pixi.stage.addChild(basicText);
    Pixi.render();
  }
  render() {}
}
