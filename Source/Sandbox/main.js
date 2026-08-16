import { testVector2D } from "./Math/Vector2D.js";
import { testTime } from "./Physics/Time.js";
import { testParticle } from "./Physics/Particle.js";
import { Renderer } from "./Rendering/Renderer.js";

testVector2D();
testTime();
testParticle();

const renderer = new Renderer("#canvas");
renderer.beginFrame();
renderer.endFrame();
