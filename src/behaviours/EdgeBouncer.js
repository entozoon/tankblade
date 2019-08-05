import { constrain } from "../lib/utilities";

export default class {
  constructor() {
    this.fuckingUp = this.fuckingUp;
    this.bounceUpdate = this.bounceUpdate;
    this.fuckupTimer;
  }
  fuckingUp() {
    clearTimeout(this.fuckupTimer);
    this.fuckupTimer = setTimeout(() => {
      // Won't necessarily do anything, if it boinked it's way back in
      this.setPosition({
        y: constrain(this.position.y, 0, 64),
        x: constrain(this.position.x, 0, 64)
      });
    }, 2000);
  }
  bounceUpdate(dt) {
    const nudge = this.thrustPower * 2,
      offsetY = 3,
      offsetX = 6;
    if (this.position.y < offsetY || this.position.y > 64 - offsetY) {
      this.fuckingUp();
      this.thrust.y =
        -Math.sign(this.thrust.y) * (Math.abs(this.thrust.y) + nudge);
    }
    if (this.position.x < offsetX || this.position.x > 64 - offsetX) {
      this.fuckingUp();
      this.thrust.x =
        -Math.sign(this.thrust.x) * (Math.abs(this.thrust.x) + nudge);
    }
  }
}
