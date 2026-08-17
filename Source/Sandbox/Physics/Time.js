const FPS = 30;

const TICK_DURATION_MILLIS = 1000 / FPS;

/** The siumlated game time. */
export class Time {
  constructor() {
    this.lastMillis = performance.now();
    this.elapsedTicks = 0;
    this.totalTicks = 0;
  }

  /** Updates the simulated game time. */
  update() {
    const elapsedMillis = performance.now() - this.lastMillis;
    this.elapsedTicks = Math.floor(elapsedMillis / TICK_DURATION_MILLIS);
    this.lastMillis += this.elapsedTicks * TICK_DURATION_MILLIS;
    this.totalTicks += this.elapsedTicks;
    return this;
  }
}
