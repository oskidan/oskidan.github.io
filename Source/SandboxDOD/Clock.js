/** 
 * Creates a clock subsystem with a given blueprint:
 * ```
 * {
 *      // Optonal. Default value is 30.
 *      fps: number
 * }
 * ```
 */
export const Clock = function (blueprint) {
    const _fps = blueprint?.fps ?? 30
    const _tickMillis = 1000 / _fps;
    let _lastMillis = performance.now();

    this.elapsedTicks = 0;
    this.totalTicks = 0;

    /** Updates the simulated game time. */
    this.update = () => {
        const elapsedMillis = performance.now() - _lastMillis;
        this.elapsedTicks = Math.floor(elapsedMillis / _tickMillis);
        this.totalTicks += this.elapsedTicks;
        _lastMillis += this.elapsedTicks * _tickMillis;
        return this;
    };
};
