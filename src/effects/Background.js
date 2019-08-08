import Pixi from "../engines/Pixi";

class Background {
  create() {
    this.sprite = new Pixi.Sprite(new Pixi.Texture.from("bg.png"));
    // Object.assign(this, new Pixi.Sprite(new Pixi.Texture.from("bg.png")));

    Pixi.containerBgBlood.addChild(this.sprite);
    this.sprite.alpha = 1; // first render
    setTimeout(() => {
      Pixi.containerBgBlood.removeChild(this.sprite); // arbitrarily after first render
      this.sprite.alpha = 0.02; // bloodslick
    }, 500);
  }
  update(dt) {
    Pixi.containerBgBlood.addChild(this.sprite); // Re-add the semitransparent bg
  }
}
export default new Background(); // Single instance
