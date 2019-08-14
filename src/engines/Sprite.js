import Pixi from "../engines/Pixi";

export default class {
  constructor({ spriteSheet, adrenaline, poses }) {
    this.adrenaline = adrenaline || 0;
    this.spriteSheetTexture = new Pixi.Texture.from(spriteSheet).baseTexture;
    // // this.hero = hero;
    // this.velocity = velocity || { x: 0, y: 0 };
    // this.adrenaline = adrenaline || 0;
    // // Create texture for each frame
    this.poses = poses.map(pose => {
      pose.frames = pose.frames.map(frame => {
        frame.texture = new Pixi.Texture(this.spriteSheetTexture, frame);
        return frame;
      });
      return pose;
    });
    // Optimisation, push them all through Pixi.loader, like item assets did. Not sure how worthwhile it is in reality
    // Init - show first frame
    this.sprite = new Pixi.Sprite(this.poses[0].frames[0].texture);
    // this.sprite.scale = { x: 0.125, y: 0.125 };
    this.sprite.scale = { x: 1, y: 1 };
    // I should have done this from the start,
    // maybe avoiding having to offset sprites at all:
    this.sprite.anchor = { x: 0.5, y: 0.5 };
    this.spriteInterval;
    Pixi.containerMain.addChild(this.sprite);

    // Assign this function to itself, to expose it when being composed by Object.assign (seems redundant, but only shit in constructor gets passed up - i.e. no getters/setters)
    this.setPose = this.setPose;
    this.getPoseFromPoses = this.getPoseFromPoses;
    this.setPosition = this.setPosition;
    this.tint = this.tint;
    this.spriteUpdate = this.spriteUpdate;
    this.spriteRemove = this.spriteRemove;
    this.spriteDirectionX = this.spriteDirectionX;
  }
  spriteRemove() {
    Pixi.containerMain.removeChild(this.sprite);
  }
  setPosition(position) {
    this.position = position;
    this.sprite.position = position;
  }
  spriteDirectionX(dir) {
    //  -1, 1
    if (dir === 0) return;
    this.sprite.scale.x = dir;
  }
  getPoseFromPoses(pose) {
    return this.poses.filter(_ => _.name === pose)[0];
  }
  setPose(pose) {
    // First frame
    let thisPose = this.getPoseFromPoses(pose);
    // Only bother ourselves to fire up the animation if there's a legit change in pose.
    if (pose === this.pose) {
      return;
    }
    this.pose = pose; // e.g. 'run'
    // frame 0
    this.sprite.texture = thisPose.frames[0].texture;

    // Pump adrenaline into the interval time
    let interval = thisPose.interval;
    if (thisPose.adrenalineEnabled) interval -= this.adrenaline;

    // Set the animation going at the desired interval speed
    // I'm pretty sure intervals aren't the best for this, and that
    // after a long (long) time it breaks animations but cba with %dt
    clearInterval(this.spriteInterval);
    if (thisPose.frames.length > 1) {
      this.frameTicker = 1;
      this.spriteInterval = setInterval(() => {
        // Set the frame texture
        this.sprite.texture = thisPose.frames[this.frameTicker].texture;
        this.frameTicker =
          this.frameTicker >= thisPose.frames.length - 1
            ? 0
            : ++this.frameTicker;
      }, interval);
    }
  }
  tint() {
    this.sprite.tint = 0xff0000 + Math.random() * 0x00ffff;
  }
  spriteUpdate() {
    // vertical position based z-index
    this.sprite.zIndex = this.sprite.y + this.sprite.height / 2;
  }
}
