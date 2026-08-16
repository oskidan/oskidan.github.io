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
    this.onWindowResize()
  }
  // Installs event listeners.
  installEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
  // Resize the canvas and make sure it supports HiDPI displays.
  onWindowResize() {
    const dpr = window.devicePixelRatio;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.backBuffer.width = this.canvas.width;
    this.backBuffer.height = this.canvas.height;
    // Scale the context to ensure correct drawing operations
    this.gfx.scale(dpr, dpr);
  }
  // Starts a new frame. Clears the screen.
  beginFrame() {
    this.gfx.fillStyle = "#cae0fd";
    this.gfx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  // Ends the current frame. Swaps the rendered image onto the screen.
  endFrame() {
    this.frontBuffer.drawImage(this.backBuffer, 0, 0);
  }
  // Draws given particles as 4x4 boxes.
  drawParticles(particles) {
    const particleExtent = 2;
    const particleSize = particleExtent * 2;
    this.gfx.fillStyle = "#ff00ff";
    for (const particle of particles) {
      this.gfx.fillRect(
        particle.currPosition.x - particleExtent,
        particle.currPosition.y - particleExtent,
        particleSize,
        particleSize,
      );
    }
  }
}
