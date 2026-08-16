import { Vector2D } from "../Math/Vector2D.js";

// A point particle (also known as a "point body").
export class Particle {
  constructor(x, y) {
    if (x instanceof Vector2D) {
      this.currPosition = x.copy();
      this.prevPosition = x.copy();
    } else {
      this.currPosition = new Vector2D(x, y);
      this.prevPosition = new Vector2D(x, y);
    }
    this.acceleration = Vector2D.zero();
  }
  // Updates particle by integrating its motion with
  // the Stormer-Verlet method:
  //    pos = pos * 2 - prev_pos + acc * dt * dt
  update(time) {
    const positionBeforeUpdate = this.currPosition.copy();
    this.currPosition
      .mul(2)
      .sub(this.prevPosition)
      .add(this.acceleration.mul(time.dtSquared));
    this.prevPosition = positionBeforeUpdate;
  }
}

export const testParticle = () => {
  var sut = new Particle(0, 0);
  console.assert(
    sut.currPosition.distanceTo(0, 0) == 0,
    `Expected sut.currPosition: ${sut.currPosition.describe()}. Got: ${sut.currPosition.describe()}`,
  );
  console.assert(
    sut.prevPosition.distanceTo(0, 0) == 0,
    `Expected sut.prevPosition: ${sut.prevPosition.describe()}. Got: ${sut.prevPosition.describe()}`,
  );
  console.assert(
    sut.acceleration.distanceTo(0, 0) == 0,
    `Expected sut.acceleration: ${sut.acceleration.describe()}. Got: ${sut.acceleration.describe()}`,
  );
  const mockTime = { dtSquared: 1, elapsedTicks: 1 };
  sut.update(mockTime);
  console.assert(
    sut.currPosition.distanceTo(0, 0) == 0,
    `Expected sut.currPosition: ${sut.currPosition.describe()}. Got: ${sut.currPosition.describe()}`,
  );
  console.assert(
    sut.prevPosition.distanceTo(0, 0) == 0,
    `Expected sut.prevPosition: ${sut.prevPosition.describe()}. Got: ${sut.prevPosition.describe()}`,
  );
  console.assert(
    sut.acceleration.distanceTo(0, 0) == 0,
    `Expected sut.acceleration: ${sut.acceleration.describe()}. Got: ${sut.acceleration.describe()}`,
  );
  sut.currPosition.set(0, 1);
  sut.update(mockTime);
  console.assert(
    sut.currPosition.distanceTo(0, 2) == 0,
    `Expected sut.currPosition: ${sut.currPosition.describe()}. Got: ${sut.currPosition.describe()}`,
  );
  console.assert(
    sut.prevPosition.distanceTo(0, 1) == 0,
    `Expected sut.prevPosition: ${sut.prevPosition.describe()}. Got: ${sut.prevPosition.describe()}`,
  );
  console.assert(
    sut.acceleration.distanceTo(0, 0) == 0,
    `Expected sut.acceleration: ${sut.acceleration.describe()}. Got: ${sut.acceleration.describe()}`,
  );
  sut.acceleration.set(0, 1);
  sut.update(mockTime);
  console.assert(
    sut.currPosition.distanceTo(0, 4) == 0,
    `Expected sut.currPosition: ${sut.currPosition.describe()}. Got: ${sut.currPosition.describe()}`,
  );
  console.assert(
    sut.prevPosition.distanceTo(0, 2) == 0,
    `Expected sut.prevPosition: ${sut.prevPosition.describe()}. Got: ${sut.prevPosition.describe()}`,
  );
  console.assert(
    sut.acceleration.distanceTo(0, 1) == 0,
    `Expected sut.acceleration: ${sut.acceleration.describe()}. Got: ${sut.acceleration.describe()}`,
  );
};
