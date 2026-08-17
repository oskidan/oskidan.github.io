import { Vector2D } from "../Math/Vector2D.js";

/** Constants that represent the current state a gesture recognizer is in. */
export class GestureRecognizerState {
  /** The gesture recognizer hasn’t yet recognized its gesture, but may be evaluating touch events. */
  static get POSSIBLE() {
    return 0;
  }

  /** The gesture recognizer has received touch objects recognized as a continuous gesture. */
  static get BEGAN() {
    return 1;
  }

  /** The gesture recognizer has received touches recognized as a change to a continuous gesture. */
  static get CHANGED() {
    return 2;
  }

  /** The gesture recognizer has received touches recognized as the end of a continuous gesture. */
  static get ENDED() {
    return 3;
  }

  /** The gesture recognizer has received touches resulting in the cancellation of a continuous gesture. */
  static get CANCELLED() {
    return 4;
  }

  /** The gesture recognizer has received a multi-touch sequence that it can’t recognize as its gesture. */
  static get FAILED() {
    return 5;
  }
}

export class GestureRecognizer {
  /** @type {HTMLElement} */
  htmlElement;

  /** @type {number} */
  state;

  /** @type {function(GestureRecognizer):void|null} */
  delegate = null;

  /**
   * @param {HTMLElement} htmlElement - The HTML element on which to recognize gestures.
   */
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.state = GestureRecognizerState.POSSIBLE;
    this.installEventListeners();
  }

  installEventListeners() {
    this.htmlElement.addEventListener(
      "pointerdown",
      this.onPointerDownEvent.bind(this),
    );
    this.htmlElement.addEventListener(
      "pointermove",
      this.onPointerMoveEvent.bind(this),
    );
    this.htmlElement.addEventListener(
      "pointerup",
      this.onPointerUpEvent.bind(this),
    );
    this.htmlElement.addEventListener(
      "pointerenter",
      this.onPointerEnterEvent.bind(this),
    );
    this.htmlElement.addEventListener(
      "pointerleave",
      this.onPointerLeaveEvent.bind(this),
    );
  }

  onPointerDownEvent(event) {
    throw new Error("Subclass responsibility.");
  }

  onPointerMoveEvent(event) {
    throw new Error("Subclass responsibility.");
  }

  onPointerUpEvent(event) {
    throw new Error("Subclass responsibility.");
  }

  onPointerEnterEvent(event) {
    throw new Error("Subclass responsibility.");
  }

  onPointerLeaveEvent(event) {
    throw new Error("Subclass responsibility.");
  }

  /**
   * @param {PointerEvent} event - The event which coordinates to obtain.
   * @returns {Vector2D} The coordiantes where the event happend in the THML element.
   */
  getCoordinatesOf(event) {
    const clientPosition = new Vector2D(event.clientX, event.clientY);
    const clientBounds = this.htmlElement.getBoundingClientRect();
    clientPosition.sub(clientBounds.x, clientBounds.y);
    return clientPosition;
  }

  /**
   * @returns {number} The number of points involved in the gesture represented by the gesture recognizer.
   */
  pointCount() {
    return 0;
  }

  /**
   * @param {number} i - The index of a point int a private array maintained by the `GestureRecognizer`.
   */
  pointAtIndex(i) {
    throw new Error("Subclass responsibility.");
  }

  /**
   * Updates the state and notifies the delegate.
   */
  updateState(newState) {
    this.state = newState;
    if (this.delegate !== null) {
      this.delegate(this);
    }
    switch (this.state) {
      case GestureRecognizerState.ENDED:
      case GestureRecognizerState.CANCELLED:
      case GestureRecognizerState.FAILED:
        this.reset();
        break;
      default:
        // Do nothing.
        break;
    }
  }

  /**
   * Overridden to reset internal state when a gesture recognition attempt completes.
   */
  reset() {
    this.state = GestureRecognizerState.POSSIBLE;
  }
}
