const EPSILON = 0.01;

/**
 * Compares `a` and `b` for equality.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is less than the given `epsilon`.
 */
export const equal = (a, b, epsilon) => {
  const delta = a - b;
  return Math.abs(delta) <= (epsilon || EPSILON);
};

/**
 * Compares `a` and `b` for inequality.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is greater than the given `epsilon`.
 */
export const notEqual = (a, b, epsilon) => {
  const delta = a - b;
  return Math.abs(delta) > (epsilon || EPSILON);
};

/**
 * Compares if `a` is less than `b`.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is negative and less than `-epsilon`.
 */
export const lessThan = (a, b, epsilon) => {
  const delta = a - b;
  return delta < 0 && delta < -(epsilon || EPSILON);
};

/**
 * Compares if `a` is greater than `b`.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is positive and greater than `epsilon`.
 */
export const greaterThan = (a, b, epsilon) => {
  const delta = a - b;
  return delta > 0 && delta > (epsilon || EPSILON);
};

/**
 * Compares if `a` is less than or equal to `b`.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is less than `epsilon`.
 */
export const lessThanOrEqual = (a, b, epsilon) => {
  const delta = a - b;
  return delta < (epsilon || EPSILON);
};

/**
 * Compares if `a` is greater than or equal to `b`.
 * @param {number} a - The number `a` to compare.
 * @param {number} b - The number `b` to compare.
 * @param {number} [epsilon=EPSILON] - The tolerance.
 * @returns `true` if the distance between `a` and `b` is greater than `-epsilon`.
 */
export const greaterThanOrEqual = (a, b, epsilon) => {
  const delta = a - b;
  return delta > -(epsilon || EPSILON);
};
