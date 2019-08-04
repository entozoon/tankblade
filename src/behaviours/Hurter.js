export default class {
  constructor({ hp }) {
    this.hurting = false;
    this.hp = hp;
    this.hurt = this.hurt;
    this.die = this.die;
  }
  die() {
    console.log("Dying");
  }
  hurt(value) {
    this.hp -= value;
    this.hurting = true;
    clearTimeout(this.hurtingTimeout);
    this.hurtingTimeout = setTimeout(() => {
      this.hurting = false;
    }, 2000);
    if (this.hp <= 0) {
      this.die();
    }
  }
}
