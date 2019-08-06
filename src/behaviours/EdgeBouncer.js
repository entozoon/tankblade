import { constrain } from "../lib/utilities";

export default class {
  constructor() {
    this.fuckingUp = this.fuckingUp;
    this.fuckingUpReset = this.fuckingUpReset;
    this.bounceUpdate = this.bounceUpdate;
    this.fuckingUpTimer;
    this.inset = 6;
  }
  fuckingUp(dt) {
    this.fuckingUpTimer += dt;

    // Won't necessarily do anything, like if it boinked it's way back in
    if (this.fuckingUpTimer > 2000) {
      this.setPosition({
        y: constrain(this.position.y, this.inset, 64 - this.inset),
        x: constrain(this.position.x, this.inset, 64 - this.inset)
      });
      this.setThrust({ y: 0, x: 0 });
    }
  }
  fuckingUpReset() {
    this.fuckingUpTimer = 0;
  }
  bounceUpdate(dt) {
    const nudge = this.thrustPower * 2,
      offsetY = 3,
      offsetX = 6;
    if (this.position.y < offsetY || this.position.y > 64 - offsetY) {
      this.thrust.y =
        -Math.sign(this.thrust.y) * (Math.abs(this.thrust.y) + nudge);
      this.fuckingUp(dt);
    } else if (this.position.x < offsetX || this.position.x > 64 - offsetX) {
      this.thrust.x =
        -Math.sign(this.thrust.x) * (Math.abs(this.thrust.x) + nudge);
      this.fuckingUp(dt);
    } else {
      this.fuckingUpReset();
    }
  }
}
