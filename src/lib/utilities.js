export const constrain = (value, min, max) =>
  value > max ? max : value < min ? min : value;
// Bounding box jank
export const within = (a, b) =>
  b.position.y - b.height / 2 < a.position.y + a.height / 2 &&
  b.position.y + b.height / 2 > a.position.y - a.height / 2 &&
  b.position.x - b.width / 2 < a.position.x + a.width / 2 &&
  b.position.x + b.width / 2 > a.position.x - a.width / 2;
