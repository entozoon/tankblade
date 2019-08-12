class Time {
  create() {
    return new Promise(resolve => {
      this.reset();
      resolve();
    });
  }
  update() {
    this.dt = Date.now() - this.then;
    this.then = Date.now();
    this.elapsed = this.then - this.start;
  }
  reset() {
    this.start = Date.now(); // <- reset to restart waves
    this.then = Date.now();
  }
}
export default new Time(); // Single instance
