import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";

export default class {
  constructor() {
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "hero.png",
        poses: [
          {
            name: "default",
            interval: 1000,
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
      new Mover({
        thrustPower: 0.15,
        thrustLimit: 1.5,
        decelerationSpeed: 0.3,
        minThrust: 0.01
      })
    );

    this.pose("default");
    this.tint();
    this.constructed = true;
  }
  update() {
    if (!this.constructed) return;
    this.move();
    this.bounce();
  }
}
