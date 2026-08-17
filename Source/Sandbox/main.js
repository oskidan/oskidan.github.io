import { Time } from "./Physics/Time.js";
import { Particle } from "./Physics/Particle.js";
import { Spring } from "./Physics/Spring.js";
import { Vector2D } from "./Math/Vector2D.js";
import { Renderer } from "./Rendering/Renderer.js";
import {
  GestureRecognizer,
  GestureRecognizerState,
} from "./Gestures/GestureRecognizer.js";
import { TapGestureRecognizer } from "./Gestures/TapGestureRecognizer.js";

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

  new Particle(0, 0), // 19
];

const gravity = 1;

const springs = [
  new Spring(particles[0], particles[1], 1, "a"),
  new Spring(particles[1], particles[2], 1, "b"),
  new Spring(particles[2], particles[3]),
  new Spring(particles[3], particles[0]),
  new Spring(particles[0], particles[2]),
  new Spring(particles[1], particles[3]),

  new Spring(particles[0], particles[4]),
  new Spring(particles[4], particles[5]),
  new Spring(particles[5], particles[6]),
  new Spring(particles[6], particles[7]),
  new Spring(particles[7], particles[8]),

  new Spring(particles[2], particles[9]),
  new Spring(particles[9], particles[10]),
  new Spring(particles[10], particles[11]),
  new Spring(particles[11], particles[12]),
  new Spring(particles[12], particles[13]),

  new Spring(particles[14], particles[15]),
  new Spring(particles[15], particles[16]),
  new Spring(particles[16], particles[17]),
  new Spring(particles[17], particles[18]),
  new Spring(particles[18], particles[1]),
];

const gameUpdate = () => {
  for (const particle of particles) {
    particle.accelerate(0, gravity);
    particle.update(time);
  }
  for (let i = 0; i < 3; i++) {
    for (const spring of springs) {
      spring.applyConstraint();
    }
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

const gestureRecognizer = new TapGestureRecognizer(renderer.canvas);
gestureRecognizer.delegate = (recognizer) => {
  console.log(`Recognizer state ${recognizer.state}`);
  if (recognizer.state == GestureRecognizerState.ENDED) {
    const tapLocation = recognizer.pointAtIndex(0);
    console.log(`Tapped ${tapLocation.describe()}`);
    for (const particle of particles) {
      const dir = particle.currPosition.copy().sub(tapLocation);
      const mag = (1.0 - Math.min(dir.magnitude() / 128, 1.0)) * 64;
      dir.normalize();
      particle.accelerate(dir.mul(mag));
    }
  }
};

// Pin this particle so it does not move.
particles[14].isPinned = true;
particles[19].isPinned = true;
// Run the game.
gameLoop();
