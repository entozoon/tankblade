export default class {
  constructor() {
    this.bounceUpdate = this.bounceUpdate;
  }
  bounceUpdate(dt) {
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
