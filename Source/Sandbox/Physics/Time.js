export class Time {
  constructor(fps, lastTickMillis) {
    this.fps = fps || 30;
    this.dt = 1 / this.fps;
    this.dtSquared = this.dt * this.dt;
    this.lastTickMillis = lastTickMillis || performance.now();
    this.millisPerTick = 1000 / fps;
    this.elapsedTicks = 0;
  }
  // Updates the game time with a given current timestamp in milliseconds.
  update(currMillis) {
    const elapsedMillis = currMillis - this.lastTickMillis;
    this.elapsedTicks = Math.floor(elapsedMillis / this.millisPerTick);
    this.lastTickMillis += this.elapsedTicks * this.millisPerTick;
    return this;
  }
}

export const testTime = () => {
  var sut = new Time(1, 0);
  console.assert(
    sut.fps == 1,
    `Expected: sut.fps == 1, got sut.fps == ${sut.fps}`,
  );
  console.assert(sut.dt == 1, `Expected: sut.dt == 1, got sut.dt == ${sut.dt}`);
  console.assert(
    sut.dtSquared == 1,
    `Expected: sut.dtSquared == 1, got sut.dtSquared == ${sut.dtSquared}`,
  );
  console.assert(
    sut.lastTickMillis == 0,
    `Expected: sut.lastTickMillis == 0, got sut.lastTickMillis == ${sut.lastTickMillis}`,
  );
  console.assert(
    sut.millisPerTick == 1000,
    `Expected: sut.millisPerTick == 1000, got sut.millisPerTick == ${sut.millisPerTick}`,
  );
  console.assert(
    sut.elapsedTicks == 0,
    `Expected: sut.elapsedTicks == 1000, got sut.elapsedTicks == ${sut.elapsedTicks}`,
  );
  sut.update(100);
  console.assert(
    sut.elapsedTicks == 0,
    `Expected: sut.elapsedTicks == 0, got sut.elapsedTicks == ${sut.elapsedTicks}`,
  );
  console.assert(
    sut.lastTickMillis == 0,
    `Expected: sut.lastTickMillis == 0, got sut.lastTickMillis == ${sut.lastTickMillis}`,
  );
  sut.update(1300);
  console.assert(
    sut.elapsedTicks == 1,
    `Expected: sut.elapsedTicks == 1, got sut.elapsedTicks == ${sut.elapsedTicks}`,
  );
  console.assert(
    sut.lastTickMillis == 1000,
    `Expected: sut.lastTickMillis == 1000, got sut.lastTickMillis == ${sut.lastTickMillis}`,
  );
};
