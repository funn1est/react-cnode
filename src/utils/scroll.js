/**
 * page scroll to height
 * @param {number} height
 */
export function scrollTo(height) {
  document.documentElement.scrollTop = height;
  document.body.scrollTop = height;
}

/**
 * page current height
 *
 * @returns {number}
 */
export function getScrollHeight() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}
