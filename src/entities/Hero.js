// import Pixi from "../engines/Pixi";
import Sprite from "../engines/Sprite";
// import Entity from "../engines/Entity";

// class Mover {
//   constructor() {
//     this.thing = this.thing;
//     this.x = this.x;

//     Object.defineProperty(this, "status", {
//       set: x => this._x * 3
//     });
//   }
//   set x(x) {
//     this._x = x * 2;
//   }
//   get x() {
//     return this._x;
//   }
//   thing() {
//     console.log("thinging");
//   }
// }

export default class {
  // export default class extends Entity {
  constructor() {
    // super();

    // Object.assign(this, new Mover());
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "hero.png",
        poses: [
          {
            name: "default",
            interval: 150,
            frames: [
              {
                x: 0,
                y: 0,
                width: 106,
                height: 106
              },
              {
                x: 106,
                y: 0,
                width: 106,
                height: 106
              }
            ]
          }
        ]
      })
    );

    // what I probs wanna do is, every time it sets x, it also sets this.sprite.x

    this.position = {
      x: 0,
      y: 0
    };

    this.pose("default");
  }
  update() {}
}
