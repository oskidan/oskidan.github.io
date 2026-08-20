import { requiredProperty } from './Debugging.js';

/**
 * Creates a rendering subsystem with the following blueprint:
 * ```
 * {
 *      // Required. The HTMLCanvasElement that will be used to display the rendered content.
 *      canvas: HTMLCanvasElement,
 * }
 * ```
 */
export const Renderer = function (blueprint) {
    const _canvas = blueprint?.canvas ?? requiredProperty('canvas');
    const _frontBuffer = canvas.getContext('2d', { alpha: false });
    const _backBuffer = document.createElement('canvas');
    const _gfx = _backBuffer.getContext('2d');

    this.resize = () => {
        const dpr = window.devicePixelRatio;
        _canvas.width = _canvas.clientWidth * dpr;
        _canvas.height = _canvas.clientHeight * dpr;
        _backBuffer.width = _canvas.width;
        _backBuffer.height = _canvas.height;
        // Scale the context to ensure correct drawing operations
        _gfx.scale(dpr, dpr);
    };

    /** Starts a new rendering frame. Must be called first before any other functions. */
    this.beginFrame = () => {
        _gfx.fillStyle = '#4c087b';
        _gfx.fillRect(0, 0, _canvas.width, _canvas.height);
    };

    /** Finishes the current rendering frame. Must be called last after the frame drawing commands. */
    this.endFrame = () => {
        _frontBuffer.drawImage(_backBuffer, 0, 0);
    };

    /** Draws given particles. */
    this.drawParticles = (particles) => {
        const particleExtent = 2;
        const particleSize = particleExtent * 2;
        _gfx.fillStyle = '#ff00ff';
        for (let i = 0; i < particles.count; i++) {
            _gfx.fillRect(
                particles.currPos[i].x - particleExtent,
                particles.currPos[i].y - particleExtent,
                particleSize,
                particleSize,
            );
        }
    };

    /**
     * Draws a given box.
     * @param {Box} box - The box to draw.
     */
    this.drawBox = (box) => {
        _gfx.strokeStyle = '#ff00ff';
        _gfx.strokeRect(box.x ?? 0, box.y ?? 0, box.w ?? 0, box.h ?? 0);
    };

    this.drawSprings = (springs) => {
        _gfx.strokeStyle = '#ff00ff';
        _gfx.beginPath();
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
            _gfx.moveTo(springs.particles.currPos[i0].x, springs.particles.currPos[i0].y);
            _gfx.lineTo(springs.particles.currPos[i1].x, springs.particles.currPos[i1].y);
        }
        _gfx.stroke();
    };
};
