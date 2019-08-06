import Pixi from "../engines/Pixi";

class Bloodener {
  constructor() {
    this.particleContainer = new Pixi.ParticleContainer(1000, {
      // bloodener = this.autoDetectRenderer({
      // most are default, but just for dev..
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
      preserveDrawingBuffer: true,
      clearBeforeRender: false
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
    Pixi.stage.addChild(this.particleContainer);
  }
}
export default new Bloodener(); // Single instance
