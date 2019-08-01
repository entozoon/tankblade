// import Pixi from "../engines/Pixi";
import Sprite from "../engines/Sprite";
// import Entity from "../engines/Entity";

class Mover {
  constructor() {
    this.x = 10;
    this.y = 11;
    console.log("mover", this.y, this.x);
  }
}

class Controllable {
  constructor() {
    this.keyCodes = {
      38: "up",
      87: "up",
      40: "down",
      83: "down",
      37: "left",
      65: "left",
      39: "right",
      68: "right",
      32: "space"
    };
    this.keyMatrix = {};
    // this.keyMatrix = [...new Set(Object.values(this.keyCodes))]; // nah, cope undefines innit
    document.addEventListener("keydown", e => {
      this.keypress(e);
    });
    document.addEventListener("keyup", e => {
      this.keypress(e);
    });
  }
  keypress(e) {
    e.preventDefault();
    if (this.keyCodes[e.keyCode]) {
      if (this.keyMatrix[this.keyCodes[e.keyCode]] !== (e.type === "keydown")) {
        this.keyMatrix[this.keyCodes[e.keyCode]] = e.type === "keydown";
        // Significant interaction moment. Don't.. don't worry about ^this code; hard braindump
        // console.log(this.keyMatrix);
      }
    }
  }
}

export default class {
  // export default class extends Entity {
  constructor() {
    // super();

    Object.assign(
      this,
      new Sprite({
        spriteSheet: "hero.png",
        poses: [
          {
            name: "default",
            interval: 50, // dig dooowwwwn when moving! or spacebar..?
            frames: [
              {
                x: 0,
                y: 0,
                width: 18,
                height: 15
              },
              {
                x: 18,
                y: 0,
                width: 18,
                height: 15
              },
              {
                x: 36,
                y: 0,
                width: 18,
                height: 15
              },
              {
                x: 54,
                y: 0,
                width: 18,
                height: 15
              }
            ]
          }
        ]
      }),
      new Mover(),
      new Controllable()
    );

    this.pose("default");

    this.constructed = true;
    console.log("ready", this.y, this.x);
  }
  set y(y) {
    console.log("set", y, this.x);
    this._y = y;
    this.setSpriteY(y);
  }
  get y() {
    return this._y;
  }
  update() {
    if (!this.constructed) return;
    if (this.keyMatrix.up) {
      // this.position.y -= 1;
      // let position = this.position;
      // position.y -= 1;
      console.log("keym", this.y, this.x, this);
      // this.position = position;
      this.y -= 0.1;
    }
  }
}
