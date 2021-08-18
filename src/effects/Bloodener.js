import Pixi from "../engines/Pixi";

class Bloodener {
  constructor() {
    this.create = () =>
      new Promise((resolve) => {
        this.particleContainer = new Pixi.ParticleContainer(1000, {
          // bloodener = this.autoDetectRenderer({
          // most are default, but just for dev..
          scale: true,
          position: true,
          rotation: true,
          uvs: true,
          alpha: true,
          preserveDrawingBuffer: true,
          clearBeforeRender: false,
          // width: 64,
          // height: 64,
          // antialias: false,
          // transparent: false,
          // resolution: 1,
          // backgroundColor: 0x222222,
          // preserveDrawingBuffer: true,
          // clearBeforeRender: false
        });
        this.particleContainer.zIndex = 1000;
        Pixi.containerBgBlood.addChild(this.particleContainer);
        resolve();
      });
  }
  newBlood(posStart, posEnd) {
    let blood = Pixi.Sprite.from("blood.png");
    // Gotta make some optimisations somehow..
    const r1 = Math.random(),
      r2 = Math.random();
    // Scale before transforms, or it get positive bias
    blood.scale.x = 0.2 + r2 * 0.5;
    blood.scale.y = 0.2 + r1 * 0.5;
    blood.x = posStart.x;
    blood.y = posStart.y;
    blood.thrust = {
      x: r2 * 6 * Math.sign(r2 - 0.5) + r1 * 3 * (posStart.x - posEnd.x),
      y: r1 * 6 * Math.sign(r1 - 0.5) + r2 * 3 * (posStart.y - posEnd.y),
    };
    blood.tint = 0x333333 + r1 * 0x999999;
    blood.lifespan = 750 + r2 * 1250;
    blood.lifeFactor = 1;
    // blood.zIndex = 1000;
    this.particleContainer.addChild(blood);
    return blood;
  }
}
export default new Bloodener(); // Single instance
