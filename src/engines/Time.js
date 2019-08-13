class Time {
  constructor() {
    this.reset();
  }
  reset() {
    // console.log("Time reset");
    this.pause = false;
    this.start = Date.now(); // <- reset to restart waves
    this.then = Date.now();
  }
  update() {
    if (this.pause) this.then = Date.now();
    this.dt = Date.now() - this.then;
    this.then = Date.now();
    this.elapsed = this.then - this.start;
  }
}
export default new Time(); // Single instance
