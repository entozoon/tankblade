import { within } from "../lib/utilities";

export default class {
  constructor({ target, bounceThrust }) {
    this.target = target;
    this.bounceThrust = bounceThrust;
    this.seekerUpdate = this.seekerUpdate;
    // Why do I have to do this? I mean, these .. they aren't exposed
    this.thrustToward = this.thrustToward;
    this.thrustAway = this.thrustAway;
    this.bounceOffTarget = this.bounceOffTarget;
    this.targetOffset = {
      x: Math.random() * 14 - 7,
      y: Math.random() * 10 - 5
    };
  }
  thrustToward(b) {
    let targetOffset = {
      x: b.position.x + this.targetOffset.x - this.position.x,
      y: b.position.y + this.targetOffset.y - this.position.y
    };
    const thrustNew = {
      x: Math.sign(targetOffset.x) * this.thrustPower,
      y: Math.sign(targetOffset.y) * this.thrustPower
    };
    // Reduce up down thrust spazzing when zeroing in on b, on each axis
    thrustNew.x = Math.abs(targetOffset.x) < 0.1 ? 0 : thrustNew.x;
    thrustNew.y = Math.abs(targetOffset.y) < 0.1 ? 0 : thrustNew.y;

    this.setThrust(thrustNew);
  }
  thrustAway(b) {
    // Stop multiple collisions
    if (!this.hurting) {
      // Get shoved by b's momentum somewhat, plus some extra bounceThrust, i.e. from blades
      this.setThrust({
        x:
          b.thrust.x * 0.5 +
          this.bounceThrust * Math.sign(this.position.x - b.position.x),
        ignoreLimits: true,
        y:
          b.thrust.y * 0.5 +
          this.bounceThrust * Math.sign(this.position.y - b.position.y)
      });
    }
  }
  bounceOffTarget() {
    if (within(this, this.target)) {
      this.target.seekerCollision(this);
      this.thrustAway(this.target);
      this.hurt(10);
    }
  }
  seekerUpdate() {
    this.thrustToward(this.target);
    this.bounceOffTarget();
    // debugger;
  }
}
