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
        x: constrain(this.position.x, this.inset, 64 - this.inset),
        y: constrain(this.position.y, this.inset, 64 - this.inset)
      });
      this.setThrust({ x: 0, y: 0 });
    }
  }
  fuckingUpReset() {
    this.fuckingUpTimer = 0;
  }
  bounceUpdate() {
    const nudge = this.thrustPower * 2,
      offsetY = 3,
      offsetX = 6;
    const offPisteDir = {
      x:
        this.position.x < offsetX ? -1 : this.position.x > 64 - offsetX ? 1 : 0,
      y: this.position.y < offsetY ? -1 : this.position.y > 64 - offsetY ? 1 : 0
    };
    if (offPisteDir.x) {
      this.thrust.x = -offPisteDir.x * (Math.abs(this.thrust.x) + nudge);
    }
    if (offPisteDir.y) {
      this.thrust.y = -offPisteDir.y * (Math.abs(this.thrust.y) + nudge);
    }
    if (!offPisteDir.x && !offPisteDir.y) {
      this.fuckingUpReset();
    }
  }
}
