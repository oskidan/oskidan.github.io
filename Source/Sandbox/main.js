import { testVector2D } from "./Math/Vector2D.js";
import { testTime, Time } from "./Physics/Time.js";
import { testParticle, Particle } from "./Physics/Particle.js";
import { Spring } from "./Physics/Spring.js";
import { Renderer } from "./Rendering/Renderer.js";

testVector2D();
testTime();
testParticle();

const time = new Time(30);
const renderer = new Renderer("#canvas");

const particles = [
  new Particle(100, 100), // 0
  new Particle(200, 100), // 1
  new Particle(200, 200), // 2
  new Particle(100, 200), // 3

  new Particle(100, 220), // 4
  new Particle(100, 240), // 5
  new Particle(100, 260), // 6
  new Particle(100, 280), // 7
  new Particle(100, 300), // 8

  new Particle(200, 220), // 9
  new Particle(200, 240), // 10
  new Particle(200, 260), // 11
  new Particle(200, 280), // 12
  new Particle(200, 300), // 13

  new Particle(200, 150), // 14
  new Particle(200, 140), // 15
  new Particle(200, 130), // 16
  new Particle(200, 120), // 17
  new Particle(200, 110), // 18
];

const gravity = 200 

const springs = [
  new Spring(particles[0], particles[1], 2.0 * gravity),
  new Spring(particles[1], particles[2], 2.0 * gravity),
  new Spring(particles[2], particles[3], 2.0 * gravity),
  new Spring(particles[3], particles[0], 2.0 * gravity),
  new Spring(particles[0], particles[2], 2.0 * gravity),
  new Spring(particles[1], particles[3], 2.0 * gravity),

  new Spring(particles[0], particles[4], 0.7 * gravity),
  new Spring(particles[4], particles[5], 0.7 * gravity),
  new Spring(particles[5], particles[6], 0.7 * gravity),
  new Spring(particles[6], particles[7], 0.7 * gravity),
  new Spring(particles[7], particles[8], 0.7 * gravity),

  new Spring(particles[2],  particles[9 ], 0.4 * gravity),
  new Spring(particles[9],  particles[10], 0.4 * gravity),
  new Spring(particles[10], particles[11], 0.4 * gravity),
  new Spring(particles[11], particles[12], 0.4 * gravity),
  new Spring(particles[12], particles[13], 0.4 * gravity),

  new Spring(particles[14], particles[15], 1.0 * gravity),
  new Spring(particles[15], particles[16], 1.0 * gravity),
  new Spring(particles[16], particles[17], 1.0 * gravity),
  new Spring(particles[17], particles[18], 1.0 * gravity),
  new Spring(particles[18], particles[1],  1.0 * gravity),
];

const gameUpdate = () => {
  for (const particle of particles) {
    // Gravity. Please note that it cannot be modelled as a force,
    // because all objects accelerate the same amount due to gravity.
    particle.applyAccel(0, gravity);
    particle.update(time);
  }
  for (const spring of springs) {
    spring.update();
  }
  for (const particle of particles) {
    particle.update(time);
  }
};

const gameDraw = () => {
  renderer.beginFrame();
  renderer.drawSprings(springs);
  renderer.drawParticles(particles);
  renderer.endFrame();
};

const gameLoop = (currMillis) => {
  time.update(currMillis);
  for (var i = 0; i < time.elapsedTicks; i++) {
    gameUpdate();
  }
  if (time.elapsedTicks > 0) {
    gameDraw();
  }
  window.requestAnimationFrame(gameLoop);
};

// Pin this particle so it does not move.
particles[14].isPinned = true;
// Run the game.
gameLoop();
