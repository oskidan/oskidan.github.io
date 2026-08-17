import { Vector2D } from "../Math/Vector2D.js";

const DAMPING = 0.98;

const RESTING_VELOCITY_THRESHOLD = 0.1;

/** A point particle (also known as a "point body"). */
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
    this.isPinned = false;
    this.isAtRest = false;
  }

  /**
   * @returns {Vector2D} The velocity of this particle.
   */
  velocity() {
    return this.currPosition.copy().sub(this.prevPosition);
  }

  /**
   * Updates the particle position in space.
   * The algorithim is based on Verlet integration method.
   */
  update() {
    if (this.isPinned || this.isAtRest) {
      return;
    }
    const positionBeforeUpdate = this.currPosition.copy();
    this.currPosition.add(this.velocity().add(this.acceleration).mul(DAMPING));
    this.prevPosition = positionBeforeUpdate;
    this.acceleration.set(0, 0);
    return this;
  }

  /**
   * Applies a given acceleration to the particle.
   */
  accelerate(x, y) {
    if (this.isPinned) {
      return;
    }
    const accel = x instanceof Vector2D ? x.copy() : new Vector2D(x, y);
    this.acceleration.add(accel);
    return this;
  }

  /**
   * @param {Particle} anotherParticle - The particle to compute distance to.
   * @returns {number} The distance from this particle to the given one.
   */
  distanceTo(anotherParticle) {
    return this.vectorTo(anotherParticle).magnitude();
  }

  /**
   * @param {Particle} anotherParticle - The particle to which to build a vector.
   * @returns {Vector2D} A vector from this particle to the given one.
   */
  vectorTo(anotherParticle) {
    return anotherParticle.currPosition.copy().sub(this.currPosition);
  }

  /**
   * @param {Vector2D} direction - The vector that represents the direction of movement. Can be a non-unit vector.
   * @param {number} amount - The displacement along the given direction.
   */
  moveInDirectionBy(direction, amount) {
    if (this.isPinned) {
      return;
    }
    const displacementVector = direction.copy().normalize().mul(amount);
    this.currPosition.add(displacementVector);
    return this;
  }
}
