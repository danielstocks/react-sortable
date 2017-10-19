"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swapArrayElements = swapArrayElements;
exports.isMouseBeyond = isMouseBeyond;
/*** Helper functions - they are decoupled because of testability */

/**
 * @param {array} items
 * @param {number} indexFrom
 * @param {number} indexTo
 * @returns {array}
 */
function swapArrayElements(items, indexFrom, indexTo) {
  var item = items[indexTo];
  items[indexTo] = items[indexFrom];
  items[indexFrom] = item;
  return items;
}

/**
 * @param {number} mousePos
 * @param {number} elementPos
 * @param {number} elementSize
 * @returns {boolean}
 */
function isMouseBeyond(mousePos, elementPos, elementSize, moveInMiddle) {
  var breakPoint;
  if (moveInMiddle) {
    breakPoint = elementSize / 2; //break point is set to the middle line of element
  } else {
    breakPoint = 0;
  }
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}