/**
 * Creates a box with a given blueprint:
 * ```
 * {
 *      // The top-left corner of the box. Defaults to (0, 0)
 *      x: number,
 *      y: number,
 * 
 *      // The size of the box. Defautls to 0x0
 *      w: number,
 *      h: number,
 * }
 * ```
 */
export const Box = function(blueprint) {
    this.x = blueprint?.x ?? 0
    this.y = blueprint?.y ?? 0
    this.w = blueprint?.w ?? 0
    this.h = blueprint?.h ?? 0
}