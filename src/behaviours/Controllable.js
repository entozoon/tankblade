import Pixi from "../engines/Pixi";

const getTouchPos = (canvas, e) => {
  // Grab the scale because, the bloody transforms don't get factored in
  const scale = Math.round(canvas.getBoundingClientRect().width / 64);
  return {
    x: (e.touches[0].clientX - canvas.getBoundingClientRect().left) / scale,
    y: (e.touches[0].clientY - canvas.getBoundingClientRect().top) / scale
  };
};
const getKeyByValue = (object, value) =>
  Object.keys(object).find(key => object[key] === value);

const directionKeycodeFromTouchPos = ({ x, y, width, height, keyCodes }) => {
  // Trial and error to figure out down tbh, inverting up.. then sneaky partition for left/right
  let keyCode = "none";
  if (1 < (-Math.abs(x - height / 2) + height / 2) / y) keyCode = "up";
  else if (1 >= (1 - (-Math.abs(x - height / 2) + height / 2 - height)) / y)
    keyCode = "down";
  else if (x > width / 2) keyCode = "right";
  else keyCode = "left";
  return getKeyByValue(keyCodes, keyCode);
};

export default class {
  constructor() {
    this.keyCodes = {
      38: "up",
      87: "up",
      40: "down",
      83: "down",
      37: "left",
      65: "left",
      39: "right",
      68: "right",
      32: "space"
    };
    this.keyMatrix = {};
    // this.keyMatrix = [...new Set(Object.values(this.keyCodes))]; // nah, cope undefines innit
    document.addEventListener("keydown", e => {
      this.keypress(e);
    });
    document.addEventListener("keyup", e => {
      this.keypress(e);
    });

    // Simulate keypress style events for touchscreens
    const canvas = Pixi.rendererMain.view;
    canvas.addEventListener("touchstart", e => {
      let keyEventSim = {
        type: "keydown",
        keyCode: directionKeycodeFromTouchPos({
          ...getTouchPos(canvas, e),
          width: 64,
          height: 64,
          keyCodes: this.keyCodes
        }),
        preventDefault: () => {}
      };
      this.keypress(keyEventSim);
    });
    // Might have to re-write this to store relationship between start and stop..
    canvas.addEventListener("touchend", e => {
      // Sack off all keypressed events
      for (let i in this.keyMatrix) {
        this.keyMatrix[i] = false;
      }
    });

    this.controllableUpdate = this.controllableUpdate;
  }
  controllableUpdate() {
    this.setThrust({
      x: this.keyMatrix.left
        ? -this.thrustPower
        : this.keyMatrix.right
        ? this.thrustPower
        : 0,
      y: this.keyMatrix.up
        ? -this.thrustPower
        : this.keyMatrix.down
        ? this.thrustPower
        : 0
    });
  }
  keypress(e) {
    if (this.keyCodes[e.keyCode]) {
      e.preventDefault();
      if (this.keyMatrix[this.keyCodes[e.keyCode]] !== (e.type === "keydown")) {
        this.keyMatrix[this.keyCodes[e.keyCode]] = e.type === "keydown";
        // Significant interaction moment. Don't.. don't worry about ^this code; hard braindump
        // console.log(this.keyMatrix);
      }
    }
  }
}
