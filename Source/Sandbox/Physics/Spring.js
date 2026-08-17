export class Spring {
  constructor(p0, p1, stiffness, id) {
    this.p0 = p0;
    this.p1 = p1;
    this.stiffness = stiffness === undefined ? 1 : stiffness;
    this.restLength = p0.distanceTo(p1);
    this.id = id;
  }

  /**
   * @returns {number} The deformation of this pring in percents. Negative number for compressed springs, positive for
   * stretched ones.
   */
  deformation() {
    return (1.0 - this.p0.distanceTo(this.p1) / this.restLength) * 100;
  }

  /**
   * Constrains to the perticles joined by this spring.
   * Uses the spring equation: F = kX
   */
  applyConstraint() {
    var p0Contrib = this.p0.isPinned ? 0 : 1;
    var p1Contrib = this.p1.isPinned ? 0 : 1;
    const totalContrib = p0Contrib + p1Contrib;
    if (totalContrib === 0) {
      return;
    }
    p0Contrib /= totalContrib;
    p1Contrib /= totalContrib;

    const vector = this.p0.vectorTo(this.p1);
    const length = vector.magnitude();
    const displacement = (this.restLength - length) * this.stiffness;
    // When displacement is:
    //  < 0 => particles should be brought closer together;
    //  > 0 => particles should be brought further aparat;
    //  = 0 => particles should stay still.

    if (p0Contrib !== 0) {
      this.p0.moveInDirectionBy(vector, -displacement * p0Contrib);
    }
    if (p1Contrib !== 0) {
      this.p1.moveInDirectionBy(vector, displacement * p1Contrib);
    }

    return this;
  }

  /**
   * @returns The center of this spring.
   */
  center() {
    const vector = this.p0.vectorTo(this.p1);
    const center = this.p0.currPosition.copy().add(vector.mul(0.5));
    return center;
  }
}
