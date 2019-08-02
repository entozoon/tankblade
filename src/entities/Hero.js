// import Pixi from "../engines/Pixi";
import Sprite from "../engines/Sprite";
import Mover from "../behaviours/Mover";
import Controllable from "../behaviours/Controllable";

export default class {
  constructor() {
    Object.assign(
      this,
      new Sprite({
        spriteSheet: "hero.png",
        poses: [
          {
            name: "default",
            interval: 50, // dig dooowwwwn when moving! or spacebar..? or actually slow down when hitting things, perhaps to a complete halt eventually? then again a 'damage' flash is always more satisfying..
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
      }),
      new Controllable()
    );

    this.pose("default");

    this.constructed = true;
  }
  update() {
    if (!this.constructed) return;

    this.setThrust({
      y: this.keyMatrix.up
        ? -this.thrustPower
        : this.keyMatrix.down
        ? this.thrustPower
        : 0,
      x: this.keyMatrix.left
        ? -this.thrustPower
        : this.keyMatrix.right
        ? this.thrustPower
        : 0
    });
    this.move();
    this.bounce();
  }
}
