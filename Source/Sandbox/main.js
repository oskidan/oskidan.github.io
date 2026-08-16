import { testVector2D } from "./Math/Vector2D.js";
import { testTime } from "./Physics/Time.js";
import { Renderer } from "./Rendering/Renderer.js";

testVector2D();
testTime();

const renderer = new Renderer("#canvas");
