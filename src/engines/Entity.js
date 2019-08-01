export default class {
  set x(x) {
    this._x = x * 2;
  }
  get x() {
    return this._x;
  }
}
