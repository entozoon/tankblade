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
  }
  thrustToward(b) {
    this.setThrust({
      y: this.thrustPower * Math.sign(b.position.y - this.position.y),
      x: this.thrustPower * Math.sign(b.position.x - this.position.x)
    });
  }
  thrustAway(b) {
    this.setThrust({
      y: this.bounceThrust * Math.sign(this.position.y - b.position.y),
      x: this.bounceThrust * Math.sign(this.position.x - b.position.x),
      ignoreLimits: true
    });
  }
  bounceOffHero() {
    if (within(this, this.hero)) {
      this.thrustAway(this.hero);
      this.hurt(5);
    }
  }
  heroSeekerUpdate() {
    this.thrustToward(this.hero);
    this.bounceOffHero();
    // debugger;
  }
}
