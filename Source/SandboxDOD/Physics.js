/**
 * Physics subsystem. Blueprint is:
 * ```
 * {
 *      // Defaults to 1.
 *      gravity: number,
 *
 *      // Defaults to 0.9
 *      damping: number
 * }
 * ```
 */
export const Physics = function (blueprint) {
    const _gravity = blueprint?.gravity ?? 1;
    const _damping = blueprint?.damping ?? 0.9;

    /** Updates given particles using Verlet integration method. Assumes a fixed-step simulation tick. */
    this.updateParticles = (particles) => {
        for (let i = 0; i < particles.count; i++) {
            const posX = particles.currPos[i].x;
            const posY = particles.currPos[i].y;
            const velX = (particles.currPos[i].x - particles.prevPos[i].x + particles.acceleration[i].x) * _damping;
            const velY = (particles.currPos[i].y - particles.prevPos[i].y + particles.acceleration[i].y) * _damping;
            particles.currPos[i].x += velX;
            particles.currPos[i].y += velY;
            particles.prevPos[i].x = posX;
            particles.prevPos[i].y = posY;
            particles.acceleration[i].x = 0;
            particles.acceleration[i].y = 0;
        }
    };

    /** Applies the gravity to particles. This must be done before `updateParticles`. */
    this.applyGravityToParticles = (particles) => {
        for (let i = 0; i < particles.count; i++) {
            particles.acceleration[i].y += _gravity;
        }
    };

    /**
     * Constrains particles in a given box.
     * @param {Particles} particles - The particles to be constrained in the box.
     * @param {Box} box - The box where the particles must be.
     */
    this.constrainParticlesInBox = (particles, box) => {
        const minX = box.x ?? 0;
        const minY = box.y ?? 0;
        const maxX = minX + (box.w ?? 1000);
        const maxY = minY + (box.h ?? 1000);
        const minX2 = minX * 2;
        const maxX2 = maxX * 2;
        const minY2 = minY * 2;
        const maxY2 = maxY * 2;
        for (let i = 0; i < particles.count; i++) {
            const currX = particles.currPos[i].x;
            const currY = particles.currPos[i].y;
            const prevX = particles.prevPos[i].x;
            const prevY = particles.prevPos[i].y;
            if (currX <= minX && prevX > minX) {
                particles.currPos[i].x = minX2 - currX;
                particles.prevPos[i].x = minX2 - prevX;
            }
            if (currX >= maxX && prevX < maxX) {
                particles.currPos[i].x = maxX2 - currX;
                particles.prevPos[i].x = maxX2 - prevX;
            }
            if (currY <= minY && prevY > minY) {
                particles.currPos[i].y = minY2 - currY;
                particles.prevPos[i].y = minY2 - prevY;
            }
            if (currY >= maxY && prevY < maxY) {
                particles.currPos[i].y = maxY2 - currY;
                particles.prevPos[i].y = maxY2 - prevY;
            }
        }
    };

    /**
     * Constrains particles in stiff springs.
     */
    this.constrainSprings = (springs, _stiffness) => {
        const stiffness = (_stiffness ?? 1) / 2;
        for (let i = 0; i < springs.count; i++) {
            const { p0, p1 } = springs.endPoints[i];
            const i0 = springs.particles.deref(p0);
            if (i0 == -1) {
                continue;
            }
            const i1 = springs.particles.deref(p1);
            if (i1 == -1) {
                continue;
            }
            const restLength = springs.restLength[i];
            const dx = springs.particles.currPos[i0].x - springs.particles.currPos[i1].x;
            const dy = springs.particles.currPos[i0].y - springs.particles.currPos[i1].y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / length;
            const ny = dy / length;
            const t = stiffness * (length - restLength);
            springs.particles.currPos[i0].x -= nx * t;
            springs.particles.currPos[i0].y -= ny * t;
            springs.particles.currPos[i1].x += nx * t;
            springs.particles.currPos[i1].y += ny * t;
        }
    };
};
