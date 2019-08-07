import { within } from "../lib/utilities";
export default class {
  constructor({ hero, bounceThrust }) {
    this.hero = hero;
    this.bounceThrust = bounceThrust;
    this.heroSeekerUpdate = this.heroSeekerUpdate;
    // Why do I have to do this? I mean, these .. they aren't exposed
    this.thrustToward = this.thrustToward;
    this.thrustAway = this.thrustAway;
    this.bounceOffHero = this.bounceOffHero;
    this.targetOffset = {
      x: Math.random() * 14 - 7,
      y: Math.random() * 10 - 5
    };
  }
  thrustToward(b) {
    let heroOffset = {
      x: b.position.x + this.targetOffset.x - this.position.x,
      y: b.position.y + this.targetOffset.y - this.position.y
    };
    const thrustNew = {
      x: Math.sign(heroOffset.x) * this.thrustPower,
      y: Math.sign(heroOffset.y) * this.thrustPower
    };
    // Reduce up down thrust spazzing when zeroing in on b, on each axis
    thrustNew.x = Math.abs(heroOffset.x) < 0.1 ? 0 : thrustNew.x;
    thrustNew.y = Math.abs(heroOffset.y) < 0.1 ? 0 : thrustNew.y;

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
  bounceOffHero() {
    if (within(this, this.hero)) {
      this.hero.heroSeekerCollision(this);
      this.thrustAway(this.hero);
      this.hurt(10);
    }
  }
  heroSeekerUpdate() {
    this.thrustToward(this.hero);
    this.bounceOffHero();
    // debugger;
  }
}
