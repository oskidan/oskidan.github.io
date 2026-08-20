/** A handle to a particle. */
export const ParticleHandle = function (index, generation) {
    this.index = index;
    this.generation = generation;

    /** Returns `true` if this handle referes to the same partile as the `otherHandle`. */
    this.isEqualTo = (otherHandle) => {
        return this.index === otherHandle.index && this.generation === otherHandle.generation;
    };
};

/** A collection of particles. */
export const Particles = function () {
    this.count = 0;
    this.currPos = [];
    this.prevPos = [];
    this.acceleration = [];

    let _runningGeneration = Math.floor(Math.random() * 1000) || 1;
    const _generation = [];

    /**
     * Returns the next generation to be used by the `spawn` function. Updates `this.runningGeneration`.
     */
    const _nextGeneration = () => {
        const nextGeneration = _runningGeneration;
        _runningGeneration += 1;
        return nextGeneration;
    };

    /**
     * Dereferences a given ParticleHandle. Returns -1 if the handle is invalid, otherwise returns and index into the
     * parallel arrays.
     */
    this.deref = (handle) => {
        if (_generation[handle.index] == handle.generation) {
            return handle.index;
        }
        return -1;
    };

    /**
     * Spawns a new particle with a given blueprint:
     * ```
     *    {
     *       // an optional position, defaults to {x: 0, y: 0}
     *       pos: { x: number, y: number },
     *
     *       // an optional acceleration, defaults to: {x: 0, y: 0}
     *       accel: { x: number, y: number }
     *    }
     * ```
     */
    this.spawn = (blueprint) => {
        const pos = blueprint.pos ?? { x: 0, y: 0 };
        this.currPos.push({ x: pos.x, y: pos.y });
        this.prevPos.push({ x: pos.x, y: pos.y });
        const accel = blueprint.accel ?? { x: 0, y: 0 };
        this.acceleration.push({ x: accel.x, y: accel.y });
        const generation = _nextGeneration();
        _generation.push(generation);
        const index = this.count;
        this.count += 1;
        return new ParticleHandle(index, generation);
    };
};
