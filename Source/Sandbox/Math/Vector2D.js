/** A vector in 2D space. */
export class Vector2D {
  /**
   * Creates a vector from a pair of coordinates, or copies an existing vector.
   * @param {number|Vector2D} x - The X coordinate, or a `Vector2D` to copy.
   * @param {number} [y=0] - The Y coordinate. Ignored when `x` is a `Vector2D`.
   */
  constructor(x, y) {
    if (x instanceof Vector2D) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y || 0;
    }
  }

  /**
   * @returns {Vector2D} A new zero-length `Vector2D`.
   */
  static zero() {
    return new Vector2D(0, 0);
  }

  /**
   * Adds a given vector to this one.
   * @param {number|Vector2D} x - The X coordiante, or a `Vector2D` to add.
   * @param {number} [y=0] - The Y coordiante. Ignored when `x` is a `Vector2D`.
   */
  add(x, y) {
    if (x instanceof Vector2D) {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y || 0;
    }
    return this;
  }

  /**
   * Subtracts a given vector from this one.
   * @param {number|Vector2D} x - The X coordiante, or a `Vector2D` to subtract.
   * @param {number} [y=0] - The Y coordiante. Ignored when `x` is a `Vector2D`.
   */
  sub(x, y) {
    if (x instanceof Vector2D) {
      this.x -= x.x;
      this.y -= x.y;
    } else {
      this.x -= x;
      this.y -= y || 0;
    }
    return this;
  }

  /**
   * Multiplies every component of this vector by a given scalar.
   * @param {number} s - The scalar to multiply.
   */
  mul(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  /**
   * Divides every component of this vector by a given scalar.
   * @param {number} s - The scalar to divide.
   */
  div(s) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  /**
   * @returns The squared magnitude of this vector.
   */
  magSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * @returns The magnitude of this vector.
   */
  magnitude() {
    return Math.sqrt(this.magSquared());
  }

  /**
   * @returns The distance between this and a given vector.
   * @param {number|Vector2D} x - The X coordiante, or a `Vector2D` to find the distance to.
   * @param {number} [y=0] - The Y coordiante. Ignored when `x` is a `Vector2D`.
   */
  distanceTo(x, y) {
    if (x instanceof Vector2D) {
      return x.copy().sub(this).magnitude();
    }
    return new Vector2D(x, y).sub(this).magnitude();
  }

  /**
   * Normalizes this vector. Does nothing if this vector is a zero-length one.
   */
  normalize() {
    const magnitude = this.magnitude();
    if (magnitude == 0) {
      this.set(0, 0);
    } else {
      this.div(magnitude);
    }
    return this;
  }

  /**
   * Sets the coordinates of this vector.
   * @param {number|Vector2D} x - The X coordiante, or a `Vector2D` to set to.
   * @param {number} [y=0] - The Y coordiante. Ignored when `x` is a `Vector2D`.
   */
  set(x, y) {
    if (x instanceof Vector2D) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
    return this;
  }

  /**
   * @returns A copy of this vector.
   */
  copy() {
    return new Vector2D(this);
  }

  /**
   * @returns A string describing this vector.
   */
  describe() {
    return `(${this.x}, ${this.y})`;
  }
}
