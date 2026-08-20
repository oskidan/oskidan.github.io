import { requiredProperty } from './Debugging.js';

/**
 * Creates a collection of springs with the following blueprint:
 * ```
 * {
 *      // Required. The particles that will be joined with these springs.
 *      particles: Particles,
 * }
 * ```
 */
export const Springs = function (blueprint) {
    this.particles = blueprint?.particles ?? requiredProperty('particles');

    this.count = 0;
    this.endPoints = [];
    this.restLength = [];

    /**
     * Spawns a spring with a given blueprint:
     * ```
     * {
     *      // Required. A particle at the end of the spring.
     *      p0: ParticleHandle,
     *
     *      // Required. Another particle at the end of the spring.
     *      p1: ParticleHandle,
     * }
     * ```
     */
    this.spawnSpring = (blueprint) => {
        const p0 = blueprint?.p0 ?? requiredProperty('p0');
        const p1 = blueprint?.p1 ?? requiredProperty('p1');
        if (p0.isEqualTo(p1)) {
            return;
        }
        const i0 = this.particles.deref(p0);
        if (i0 == -1) {
            throw new Error(`Cannot spawn a spring. Particle ${p0} does not exist.`);
        }
        const i1 = this.particles.deref(p1);
        if (i1 == -1) {
            throw new Error(`Cannot spawn a spring. Particle ${p1} does not exist.`);
        }
        const dx = this.particles.currPos[i0].x - this.particles.currPos[i1].x;
        const dy = this.particles.currPos[i0].y - this.particles.currPos[i1].y;
        this.restLength.push(Math.sqrt(dx * dx + dy * dy));
        this.endPoints.push({ p0, p1 });
        this.count += 1;
    };
};
