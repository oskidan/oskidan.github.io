import {
  GestureRecognizer,
  GestureRecognizerState,
} from "./GestureRecognizer.js";

import { Vector2D } from "../Math/Vector2D.js";

// The pointer can be moved in a 10x10 area. Anything greater than that will not be considered a tap.
const MAX_AREA = 100;

export class TapGestureRecognizer extends GestureRecognizer {
  minX = 0;
  minY = 0;
  maxX = 0;
  maxY = 0;

  /**
   * @param {HTMLElement} htmlElement - The HTML element on which to recognize gestures.
   */
  constructor(htmlElement) {
    super(htmlElement);
  }

  onPointerDownEvent(event) {
    switch (this.state) {
      case GestureRecognizerState.POSSIBLE:
        const point = this.getCoordinatesOf(event);
        this.minX = point.x;
        this.minY = point.y;
        this.maxX = point.x;
        this.maxY = point.y;
        this.updateState(GestureRecognizerState.BEGAN);
        break;
      case GestureRecognizerState.BEGAN:
        this.updateState(GestureRecognizerState.FAILED);
        break;
    }
  }

  onPointerMoveEvent(event) {
    if (this.state == GestureRecognizerState.BEGAN) {
      const currPoint = this.getCoordinatesOf(event);
      const point = this.getCoordinatesOf(event);
      if (point.x < this.minX) {
        this.minX = point.x;
      }
      if (point.y < this.minY) {
        this.minY = point.y;
      }
      if (point.x > this.maxX) {
        this.maxX = point.x;
      }
      if (point.y > this.maxY) {
        this.maxY = point.y;
      }
      const currArea = (this.maxX - this.minX) * (this.maxY - this.minY);
      if (currArea > MAX_AREA) {
        this.updateState(GestureRecognizerState.FAILED);
      }
    }
  }

  onPointerUpEvent(event) {
    if (this.state == GestureRecognizerState.BEGAN) {
      this.updateState(GestureRecognizerState.ENDED);
    }
  }

  onPointerEnterEvent(event) {
    // Ignored.
  }

  onPointerLeaveEvent(event) {
    if (this.state == GestureRecognizerState.BEGAN) {
      this.updateState(GestureRecognizerState.CANCELLED);
    }
  }

  /**
   * @returns {number} The number of points involved in the gesture represented by the gesture recognizer.
   */
  pointCount() {
    return this.state == GestureRecognizerState.ENDED ? 1 : 0;
  }

  /**
   * @param {number} i - The index of a point int a private array maintained by the `GestureRecognizer`.
   */
  pointAtIndex(i) {
    if (this.state !== GestureRecognizerState.ENDED) {
      throw new Error("No tap gesture recognized yet.");
    }
    if (i !== 0) {
      throw new Error(`Point index out of range: ${i}`);
    }
    return new Vector2D(
      (this.minX + this.maxX) * 0.5,
      (this.minY + this.maxY) * 0.5,
    );
  }
}
