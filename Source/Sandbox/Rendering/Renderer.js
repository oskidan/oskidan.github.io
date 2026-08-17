import { greaterThan, lessThanOrEqual } from "../Math/Ordering.js";

/** The API for drawing the game visuals. */
export class Renderer {
  constructor(canvasId) {
    const canvas = document.querySelector(canvasId);
    if (canvas === null) {
      throw new Error(`No canvas with ID "${canvasId}".`);
    }
    const frontBuffer = canvas.getContext("2d", { alpha: false });
    if (frontBuffer === null) {
      throw new Error(
        `Cannot get 2D context for canvas with ID "${canvasId}".`,
      );
    }
    const backBuffer = document.createElement("canvas");
    if (backBuffer === null) {
      throw new Error(`Cannot create an offscreen canvas.`);
    }
    const gfx = backBuffer.getContext("2d");
    if (gfx === null) {
      throw new Error(`Cannot get 2D context for offscreen canvas.`);
    }
    this.canvas = canvas;
    this.frontBuffer = frontBuffer;
    this.backBuffer = backBuffer;
    this.gfx = gfx;
    this.installEventListeners();
    // Resize the renderer to match the canvas.
    this.onWindowResize();
  }

  /**
   * Installs event listeners.
   */
  installEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  /**
   * Resize the canvas and make sure it supports HiDPI displays.
   */
  onWindowResize() {
    const dpr = window.devicePixelRatio;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.backBuffer.width = this.canvas.width;
    this.backBuffer.height = this.canvas.height;
    // Scale the context to ensure correct drawing operations
    this.gfx.scale(dpr, dpr);
  }

  /**
   * Starts a new frame. Clears the screen.
   */
  beginFrame() {
    this.gfx.fillStyle = "#4c087b";
    this.gfx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Ends the current frame. Swaps the rendered image onto the screen.
   */
  endFrame() {
    this.frontBuffer.drawImage(this.backBuffer, 0, 0);
  }

  /**
   * Draws given particles as 4x4 boxes.
   */
  drawParticles(particles) {
    const particleExtent = 2;
    const particleSize = particleExtent * 2;
    for (const particle of particles) {
      if (particle.isPinned) {
        this.gfx.fillStyle = "#aa00aa";
      } else {
        this.gfx.fillStyle = "#ff00ff";
      }
      this.gfx.fillRect(
        particle.currPosition.x - particleExtent,
        particle.currPosition.y - particleExtent,
        particleSize,
        particleSize,
      );
    }
  }

  /**
   * Draws given springs as lines.
   */
  drawSprings(springs) {
    this.gfx.beginPath();
    // this.gfx.strokeStyle = deformation == 0 ? "#049904" : "#ff0000"
    this.gfx.strokeStyle = "#049904";
    for (const spring of springs) {
      if (lessThanOrEqual(spring.deformation(), 5)) {
        this.gfx.moveTo(spring.p0.currPosition.x, spring.p0.currPosition.y);
        this.gfx.lineTo(spring.p1.currPosition.x, spring.p1.currPosition.y);
      }
    }
    this.gfx.stroke();
    this.gfx.beginPath();
    this.gfx.strokeStyle = "#ff0000";
    for (const spring of springs) {
      if (greaterThan(spring.deformation(), 5)) {
        this.gfx.moveTo(spring.p0.currPosition.x, spring.p0.currPosition.y);
        this.gfx.lineTo(spring.p1.currPosition.x, spring.p1.currPosition.y);
      }
    }
    this.gfx.stroke();
  }
}
