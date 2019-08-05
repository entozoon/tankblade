export default class {
  constructor({ id, hp, dieEntity, hurtPause }) {
    this.hp = hp;
    this.hurt = this.hurt;
    this.die = this.die;
    this.dieEntity = dieEntity;
    this.hurtPause = hurtPause;
    this.hurting = false;
  }
  die() {
    this.dieEntity();
  }
  hurt(value) {
    this.hp -= value;
    this.hurting = true;
    clearTimeout(this.hurtingTimeout);
    if (this.hp <= 0) {
      setTimeout(() => {
        this.die();
      }, 1000);
    } else {
      this.hurtingTimeout = setTimeout(() => {
        this.hurting = false;
      }, this.hurtPause);
    }
  }
}
