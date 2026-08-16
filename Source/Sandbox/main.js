import { testVector2D } from "./Math/Vector2D.js";
import { testTime } from "./Physics/Time.js";
import { testParticle } from "./Physics/Particle.js";
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

const gameUpdate = () => {
  for (const particle of particles) {
    particle.update(time);
  }
};

const gameDraw = () => {
  renderer.beginFrame();
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
