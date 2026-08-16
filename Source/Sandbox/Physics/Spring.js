export class Spring {
  constructor(p0, p1, stiffness) {
    this.p0 = p0;
    this.p1 = p1;
    this.stiffness = stiffness === undefined ? 1 : stiffness;
    this.restLength = p0.copy().sub(p1).magnitude();
  }
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
    const springDir = springVec.normalize();
    const springLength = springVec.magnitude();
    const springDeform = Math.abs(this.restLength - springLength);
    const springForce = springDir.mul(springDeform * this.stiffness);
    this.p0.applyForce(springForce.copy().flip());
    this.p1.applyForce(springForce);
  }
}
