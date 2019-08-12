class Time {
  create() {
    return new Promise(resolve => {
      resolve();
    });
  }
}
export default new Time(); // Single instance
