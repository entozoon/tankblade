import Pixi from "../engines/Pixi";

export default class {
  constructor({ spriteSheet, poses }) {
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
    Pixi.stage.addChild(this.sprite);

    this.sprite.position = { x: 32, y: 32 };

    // Assign this function to itself, to expose it when being composed by Object.assign (seems redundant, but only shit in constructor gets passed up - i.e. no getters/setters)
    this.pose = this.pose;
    this.getPoseFromPoses = this.getPoseFromPoses;
    this.setSpriteY = this.setSpriteY;
  }

  // get position() {
  //   return this.sprite.position;
  // }
  // set position(position) {
  //   this.sprite.position = position;
  // }
  // get width() {
  //   return this.sprite.width;
  // }
  // get height() {
  //   return this.sprite.height;
  // }
  getPoseFromPoses(pose) {
    return this.poses.filter(_ => _.name === pose)[0];
  }
  // get pose() {
  //   return this._pose;
  // }

  pose(pose) {
    // First frame
    let thisPose = this.getPoseFromPoses(pose);

    // Only bother ourselves to fire up the animation if there's a legit change in pose.
    // Could also update for adrenaline change but that'd be madness
    if (pose === this.pose) {
      return;
    }
    this._pose = pose; // e.g. 'run'

    // frame 0
    this.sprite.texture = thisPose.frames[0].texture;

    // Pump adrenaline into the interval time
    let interval = this.adrenaline
      ? thisPose.interval - this.adrenaline
      : thisPose.interval;

    // if (this.pose === "fly") {
    //   console.log(this.adrenaline);
    //   console.log(interval);
    //   console.log("");
    // }
    // Limit this at instance level instead as, say stars, are mad fast
    // if (interval < 100) interval = 100;

    // Set the animation going at the desired interval speed
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

  setSpriteY(value) {
    console.log("setSpriteY", value);
    this.sprite.position.y = value;
  }
  // set x(value) {
  //   this.sprite.position.x = value;
  // }
}
