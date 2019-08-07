import { constrain } from "../lib/utilities";
export default class {
  constructor({ thrustPower, thrustLimit, decelerationSpeed, minThrust }) {
    // this.position = { y: 30, x: 30 };
    this.thrust = { x: 0, y: 0 };
    this.thrustPower = thrustPower;
    this.thrustLimit = thrustLimit;
    this.decelerationSpeed = decelerationSpeed;
    this.minThrust = minThrust;

    // Expose functions
    this.setThrust = this.setThrust;
    this.moverUpdate = this.moverUpdate;
  }
  setThrust({ x, y, ignoreLimits }) {
    if (!ignoreLimits && this.hurting) {
      return;
    }
    this.thrust.x += x;
    this.thrust.y += y;
    if (!ignoreLimits) {
      this.thrust.y = constrain(
        this.thrust.y,
        -this.thrustLimit,
        this.thrustLimit
      );
      this.thrust.x = constrain(
        this.thrust.x,
        -this.thrustLimit,
        this.thrustLimit
      );
    } else {
    }
  }
  moverUpdate(dt) {
    // Move position with current thrust
    this.position.x += this.thrust.x * dt;
    this.position.y += this.thrust.y * dt;

    // Update sprite
    this.setPosition(this.position);

    // Friction
    this.thrust.x -= this.thrust.x
      ? Math.sign(this.thrust.x) * this.decelerationSpeed * dt
      : 0;
    this.thrust.y -= this.thrust.y
      ? Math.sign(this.thrust.y) * this.decelerationSpeed * dt
      : 0;

    // Tend to 0
    this.thrust.x =
      this.thrust.x > -this.minThrust && this.thrust.x < this.minThrust
        ? 0
        : this.thrust.x;
    this.thrust.y =
      this.thrust.y > -this.minThrust && this.thrust.y < this.minThrust
        ? 0
        : this.thrust.y;
  }
}
