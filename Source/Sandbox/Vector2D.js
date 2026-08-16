export class Vector2D {
  // Constructs a vector from either a pair of coordinates
  // or another vector.
  constructor(x, y) {
    if (x instanceof Vector2D) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  // Returns a zero vector.
  static zero() {
    return new Vector2D(0, 0);
  }
  // Adds a vector to this vector.
  add(x, y) {
    if (x instanceof Vector2D) {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y;
    }
    return this;
  }
  // Subtracts a vector from this vector.
  sub(x, y) {
    if (x instanceof Vector2D) {
      this.x -= x.x;
      this.y -= x.y;
    } else {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }
  // Multiplies this vector by a given scalar.
  mul(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  // Divides this vector by a given scalar.
  div(s) {
    this.x /= s;
    this.y /= s;
    return this;
  }
  // Returns the squared magnitude of this vector.
  magSquared() {
    return this.x * this.x + this.y * this.y;
  }
  // Returns the magnitude of this vector.
  magnitude() {
    return Math.sqrt(this.magSquared());
  }
  // Normalizes this vector. If this vector is a zero vector,
  // when normalized, it remains to be a zero vector.
  noarmalize() {
    const magnitude = this.magnitude();
    if (magnitude == 0) {
      this.set(0, 0);
    } else {
      this.div(magnitude);
    }
    return this;
  }
  // Sets this vector's components.
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
  // Returns a copy of this vector.
  copy() {
    return new Vector2D(this);
  }
}

export const testVector2D = () => {
  var v0 = Vector2D.zero();
  console.assert(v0.x == 0, `Expected v0.x == 0, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 0, `Expected v0.y == 0, got v0.y == ${v0.y}.`);
  v0 = new Vector2D(1, 2);
  console.assert(v0.x == 1, `Expected v0.x == 1, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 2, `Expected v0.y == 2, got v0.y == ${v0.y}.`);
  v0.add(1, 2);
  console.assert(v0.x == 2, `Expected v0.x == 2, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 4, `Expected v0.y == 4, got v0.y == ${v0.y}.`);
  var v1 = new Vector2D(2, 3);
  v0.add(v1);
  console.assert(v0.x == 4, `Expected v0.x == 4, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 7, `Expected v0.y == 7, got v0.y == ${v0.y}.`);
  v0.sub(1, 2);
  console.assert(v0.x == 3, `Expected v0.x == 3, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 5, `Expected v0.y == 5, got v0.y == ${v0.y}.`);
  v0.sub(v1);
  console.assert(v0.x == 1, `Expected v0.x == 1, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 2, `Expected v0.y == 2, got v0.y == ${v0.y}.`);
  var s0 = v0.magSquared();
  console.assert(s0 == 5, `Expected s0 == 5, got s0 == ${s0}.`);
  v0.set(0, 3);
  console.assert(v0.x == 0, `Expected v0.x == 0, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 3, `Expected v0.y == 3, got v0.y == ${v0.y}.`);
  s0 = v0.magnitude();
  console.assert(s0 == 3, `Expected s0 == 3, got s0 == ${s0}.`);
  v0.normalize();
  console.assert(v0.x == 0, `Expected v0.x == 0, got v0.x == ${v0.x}.`);
  console.assert(v0.y == 1, `Expected v0.y == 1, got v0.y == ${v0.y}.`);
  var v2 = v1.copy();
  console.assert(v2.x == 2, `Expected v2.x == 2, got v2.x == ${v2.x}.`);
  console.assert(v2.y == 3, `Expected v2.y == 3, got v2.y == ${v2.y}.`);
};
