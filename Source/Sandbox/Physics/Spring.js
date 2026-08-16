export class Spring {
  constructor(p0, p1, stiffness) {
    this.p0 = p0;
    this.p1 = p1;
    this.stiffness = stiffness === undefined ? 1 : stiffness;
    this.restLength = p0.currPosition.copy().sub(p1.currPosition).magnitude();
    this.deformation = 0; // 0 - no deformation
  }
  // Updates the spring to enforces its constraint.
  update() {
    const p0Mass = this.p0.effectiveMass();
    const p1Mass = this.p1.effectiveMass();
    const totalMass = p0Mass + p1Mass;
    if (totalMass === 0) {
      return;
    }
    const p0Contrib = p0Mass / totalMass;
    const p1Contrib = p1Mass / totalMass;
    // p0 <- p1
    const springVec = this.p0.currPosition.copy().sub(this.p1.currPosition);
    const springDir = springVec.copy().normalize();
    const springLength = springVec.magnitude();
    const springDispl = Math.abs(this.restLength - springLength);
    const springForce = springDir.mul(springDispl * this.stiffness);
    this.p0.applyForce(springForce.copy().flip());
    this.p1.applyForce(springForce);
    this.deformation = springDispl / this.restLength;
  }
}
