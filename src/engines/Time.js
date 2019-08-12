class Time {
  constructor() {
    this.reset();
  }
  reset() {
    this.start = Date.now(); // <- reset to restart waves
    this.then = Date.now();
  }
  update() {
    this.dt = Date.now() - this.then;

    this.then = Date.now();
    this.elapsed = this.then - this.start;
  }
}
export default new Time(); // Single instance
