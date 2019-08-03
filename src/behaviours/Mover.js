const constrain = (value, min, max) =>
  value > max ? max : value < min ? min : value;

export default class {
  constructor({ thrustPower, thrustLimit, decelerationSpeed, minThrust }) {
    // this.position = { y: 30, x: 30 };
    this.thrust = { y: 0, x: 0 };
    this.thrustPower = thrustPower;
    this.thrustLimit = thrustLimit;
    this.decelerationSpeed = decelerationSpeed;
    this.minThrust = minThrust;

    // Expose functions
    this.setThrust = this.setThrust;
    this.move = this.move;
    this.bounce = this.bounce;

    // This needs a proper DT value throwing around..
    this.dt = 0.1;
  }
  setThrust({ y, x }) {
    this.thrust.y = constrain(
      this.thrust.y + y,
      -this.thrustLimit,
      this.thrustLimit
    );
    this.thrust.x = constrain(
      this.thrust.x + x,
      -this.thrustLimit,
      this.thrustLimit
    );
  }
  move() {
    // Move position with current thrust
    this.position.y += this.thrust.y;
    this.position.x += this.thrust.x;

    // Update sprite
    this.setPosition(this.position);

    // Friction
    this.thrust.y -=
      Math.sign(this.thrust.y) * this.decelerationSpeed * this.dt;
    this.thrust.x -=
      Math.sign(this.thrust.x) * this.decelerationSpeed * this.dt;

    // Tend to 0
    this.thrust.y =
      this.thrust.y > -this.minThrust && this.thrust.y < this.minThrust
        ? 0
        : this.thrust.y;
    this.thrust.x =
      this.thrust.x > -this.minThrust && this.thrust.x < this.minThrust
        ? 0
        : this.thrust.x;
  }
  bounce() {
    const nudge = this.thrustPower * 2,
      offsetY = 3,
      offsetX = 6;
    if (this.position.y < offsetY || this.position.y > 64 - offsetY)
      this.thrust.y =
        -Math.sign(this.thrust.y) * (Math.abs(this.thrust.y) + nudge);
    if (this.position.x < offsetX || this.position.x > 64 - offsetX)
      this.thrust.x =
        -Math.sign(this.thrust.x) * (Math.abs(this.thrust.x) + nudge);
  }
}
