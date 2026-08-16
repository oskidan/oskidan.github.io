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
    this.mass = 1;
    this.isPinned = false;
  }
  // Returns 0 if the particle isPinned, or its mass otherwise.
  effectiveMass() {
    return this.isPinned ? 0 : this.mass;
  }
  // Updates particle by integrating its motion with
  // the Stormer-Verlet method:
  //    pos = pos * 2 - prev_pos + acc * dt * dt
  update(time) {
    if (this.isPinned) {
      return;
    }
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
    if (this.isPinned) {
      return
    }
    const force = x instanceof Vector2D ? x.copy() : new Vector2D(x, y);
    this.acceleration.add(force.div(this.mass));
    return this;
  }
  // Applies acceleration to the particle.
  applyAccel(x, y) {
    if (this.isPinned) {
      return
    }
    const accel = x instanceof Vector2D ? x.copy() : new Vector2D(x, y);
    this.acceleartion.add(accel);
    return this;
  }
}

export const testParticle = () => {
  // Once constructed, the particle is stationary.
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

  // If updated, such particle will not move.
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

  // If its previous and current positions are different, but it has no acceleartion, then
  // the particle will move with a constant speed.
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

  // Update resets the acceleration. Acceleration determines the change in particle velocity.
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
    sut.acceleration.distanceTo(0, 0) == 0,
    `Expected sut.acceleration: ${sut.acceleration.describe()}. Got: ${sut.acceleration.describe()}`,
  );
};
