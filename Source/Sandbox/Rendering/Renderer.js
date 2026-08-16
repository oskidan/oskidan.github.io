export class Renderer {
    constructor(canvasId) {
        const canvas = document.querySelector(canvasId)
        if (canvas === null) {
            throw new Error(`No canvas with ID "${canvasId}".`)
        }
        const frontBuffer = canvas.getContext("2d", { alpha: false })
        if (frontBuffer === null) {
            throw new Error(`Cannot get 2D context for canvas with ID "${canvasId}".`)
        }
        const backBuffer = document.createElement("canvas")
        if (backBuffer === null) {
            throw new Error(`Cannot create an offscreen canvas.`)
        }
        const gfx = offscreen.getContext("2d")
        if (gfx === null) {
            throw new Error(`Cannot get 2D context for offscreen canvas.`)
        }
        this.canvas = canvas
        this.frontBuffer = frontBuffer
        this.backBuffer = backBuffer
        this.gfx = gfx
    }
}