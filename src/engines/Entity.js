// export default class extends Sprite {
export default class {
  set x(x) {
    this._x = x * 2;
    // this.sprite.x = 12...
  }
  get x() {
    return this._x;
  }
}
