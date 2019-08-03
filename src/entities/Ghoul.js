import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";

export default class {
  constructor() {
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "ghoul.png",
        poses: [
          {
            name: "default",
            interval: 100,
            frames: [
              {
                x: 0,
                y: 0,
                width: 10,
                height: 10
              },
              {
                x: 10,
                y: 0,
                width: 10,
                height: 10
              }
            ]
          }
        ]
      }),
      new Mover({
        thrustPower: 0.15,
        thrustLimit: 1.5,
        decelerationSpeed: 0.3,
        minThrust: 0.01
      })
    );
    this.setPosition({ x: 10, y: 50 });

    this.pose("default");
    this.tint();
    this.constructed = true;
  }
  update() {
    if (!this.constructed) return;
    this.move();
    this.bounce();
    this.spriteUpdate();

    // debugger;
  }
}
