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
  new Particle(100, 100),
  new Particle(200, 100),
  new Particle(200, 200),
  new Particle(100, 200),
];

const springs = [
  new Spring(particles[0], particles[1], 0.99),
  new Spring(particles[1], particles[2], 0.99),
  new Spring(particles[2], particles[3], 0.99),
  new Spring(particles[3], particles[0], 0.99),
  new Spring(particles[0], particles[2], 0.99),
  new Spring(particles[1], particles[3], 0.99),
];

const gameUpdate = () => {
  for (const particle of particles) {
    // Gravity. Please note that it cannot be modelled as a force,
    // because all objects accelerate due to gravity the same amount.
    particle.applyAccel(0, 9.8);
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
particles[1].isPinned = true;
// Run the game.
gameLoop();
