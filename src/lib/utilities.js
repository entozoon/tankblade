export const constrain = (value, min, max) =>
  value > max ? max : value < min ? min : value;

// Bounding box jank
export const within = (a, b) =>
  b.position.y - b.height / 2 < a.position.y + a.height / 2 &&
  b.position.y + b.height / 2 > a.position.y - a.height / 2 &&
  b.position.x - b.width / 2 < a.position.x + a.width / 2 &&
  b.position.x + b.width / 2 > a.position.x - a.width / 2;

export const randomOutsidePerimeter = () => {
  const fixYorX = Math.random() > 0.5 ? true : false,
    outset = 10;
  return {
    // Just.. just bear with me. I have to braindump this stuff.
    // On reflection, a circle could have been more natural
    y: fixYorX
      ? Math.random() > 0.5
        ? -outset
        : 64 + outset
      : Math.random() * 64 + outset * 2 - outset,
    x: !fixYorX
      ? Math.random() > 0.5
        ? -outset
        : 64 + outset
      : Math.random() * 64 + outset * 2 - outset
  };
};
