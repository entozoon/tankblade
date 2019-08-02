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
    this.controllableUpdate = this.controllableUpdate;
  }
  controllableUpdate() {
    this.setThrust({
      y: this.keyMatrix.up
        ? -this.thrustPower
        : this.keyMatrix.down
        ? this.thrustPower
        : 0,
      x: this.keyMatrix.left
        ? -this.thrustPower
        : this.keyMatrix.right
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
