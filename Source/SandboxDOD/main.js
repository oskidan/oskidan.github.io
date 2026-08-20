import { ParticleHandle, Particles } from './Particles.js';
import { Clock } from './Clock.js';
import { Renderer } from './Renderer.js';
import { Physics } from './Physics.js';
import { Box } from './Box.js';
import { Springs } from './Springs.js';

window.onload = () => {
    const clock = new Clock();
    const renderer = new Renderer({ canvas: document.querySelector('#canvas') });
    const physics = new Physics();
    const particles = new Particles();
    const springs = new Springs({ particles: particles });
    const sceneBounds = new Box({ x: 10, y: 10, w: 1280, h: 720 });

    window.onresize = () => {
        renderer.resize();
    };

    const grid = new Map();
    for (let i = 0; i < 108; i++) {
        for (let j = 0; j < 52; j++) {
            let p0 = particles.spawn({
                pos: {
                    x: 100 + i * 10,
                    y: 100 + j * 10,
                },
                accel: {
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                },
            });
            let p1 = grid.get((j - 1) * 10 + (i - 1));
            if (p1 !== undefined) {
                springs.spawnSpring({ p0, p1 });
            }
            p1 = grid.get((j - 1) * 10 + i);
            if (p1 !== undefined) {
                springs.spawnSpring({ p0, p1 });
            }
            p1 = grid.get((j - 1) * 10 + (i + 1));
            if (p1 !== undefined) {
                springs.spawnSpring({ p0, p1 });
            }
            p1 = grid.get(j * 10 + (i - 1));
            if (p1 !== undefined) {
                springs.spawnSpring({ p0, p1 });
            }
            grid.set(j * 10 + i, p0);
        }
    }

    const update = () => {
        physics.applyGravityToParticles(particles);
        physics.updateParticles(particles);
        for (let i = 0; i < 5; i++) {
        physics.constrainSprings(springs) //, 0.01);
        }
        physics.constrainParticlesInBox(particles, sceneBounds);
    };

    const render = () => {
        renderer.beginFrame();
        renderer.drawParticles(particles);
        renderer.drawBox(sceneBounds);
        renderer.drawSprings(springs);
        renderer.endFrame();
    };

    const gameLoop = () => {
        clock.update();
        for (let i = 0; i < clock.elapsedTicks; i++) {
            update();
        }
        if (clock.elapsedTicks !== 0) {
            render();
        }
        window.requestAnimationFrame(gameLoop);
    };

    // Initial resize of the renderer.
    renderer.resize();

    // Start the game loop.
    gameLoop();
};
