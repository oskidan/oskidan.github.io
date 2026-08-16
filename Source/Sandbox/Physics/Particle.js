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
    this.inverseMass = 1; // 1 over the mass
    /*
    Mass:
      3 + 7 = 10
      3 => 3 / 10
      7 => 7 / 10
    Inverse Mass:
      1/3 + 1/7 = (7+3)/(3*7) = 10/21
      1/3 => (1 - 1/3 div 10/21) = (1 - 21/30) = 9/30 = 3/10
      1/7 => (1 - 1/7 div 10/21) = (1 - 21/70) = 49/70 = 7/10
    */
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
    this.acceleration.set(0, 0);
    return this;
  }
  // Applies force to the particle.
  applyForce(x, y) {
    const force;
    if (x instanceof Vector2D) {
      force = x.copy();
    } else {
      force = new Vector2D(x, y);
    }
    this.acceleration.add(force.mul(this.inverseMass));
    return this;
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
