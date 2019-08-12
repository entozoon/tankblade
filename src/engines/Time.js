class Time {
  create() {
    this.start = Date.now(); // <- reset to restart waves
    this.then = Date.now();
    return new Promise(resolve => {
      resolve();
    });
  }
  update() {
    this.dt = Date.now() - this.then;
    this.then = Date.now();
    this.elapsed = this.then - this.start;
  }
}
export default new Time(); // Single instance
