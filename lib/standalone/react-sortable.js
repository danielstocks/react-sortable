(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Sortable"] = factory(require("React"));
	else
		root["Sortable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.swapArrayElements = swapArrayElements;
exports.isMouseBeyond = isMouseBeyond;
exports.SortableComposition = SortableComposition;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** Helper functions - they are decoupled from component itself for testability */

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
function isMouseBeyond(mousePos, elementPos, elementSize) {
  //TODO refactor for UP
  var breakPoint = elementSize / 2; //break point is set to the middle line of element
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}

/*** Higher-order component - this component works like a factory for draggable items */

function SortableComposition(Component) {

  var elementEdge = 0;
  var updateEdge = true;

  return _react2.default.createClass({

    proptypes: {
      items: _react2.default.PropTypes.array.isRequired,
      updateState: _react2.default.PropTypes.func.isRequired,
      sortId: _react2.default.PropTypes.number,
      outline: _react2.default.PropTypes.string.isRequired, // grid | column
      draggingIndex: _react2.default.PropTypes.number,
      childProps: _react2.default.PropTypes.object
    },

    getInitialState: function getInitialState() {
      return {
        draggingIndex: null
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.setState({
        draggingIndex: nextProps.draggingIndex
      });
    },
    sortEnd: function sortEnd() {
      this.props.updateState({
        draggingIndex: null
      });
    },
    sortStart: function sortStart(e) {
      var draggingIndex = e.currentTarget.dataset.id;

      this.props.updateState({
        draggingIndex: draggingIndex
      });
      this.setState({
        draggingIndex: draggingIndex
      });

      var dt = e.dataTransfer;
      if (dt !== undefined) {
        e.dataTransfer.setData('text', e.target);

        //fix http://stackoverflow.com/questions/27656183/preserve-appearance-of-dragged-a-element-when-using-html5-draggable-attribute
        if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
          dt.setDragImage(e.target, 0, 0);
        }
      }
      updateEdge = true;
    },
    dragOver: function dragOver(e) {
      e.preventDefault();
      var mouseBeyond;
      var positionX, positionY;
      var height, topOffset;
      var items = this.props.items;
      var overEl = e.currentTarget; //underlying element //TODO: not working for touch
      var indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
      var indexFrom = Number(this.state.draggingIndex);

      height = overEl.getBoundingClientRect().height;

      positionX = e.clientX;
      positionY = e.clientY;
      topOffset = overEl.getBoundingClientRect().top;

      if (this.props.outline === "list") {
        mouseBeyond = isMouseBeyond(positionY, topOffset, height);
      }

      if (this.props.outline === "column") {
        mouseBeyond = isMouseBeyond(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width);
      }

      if (indexDragged !== indexFrom && mouseBeyond) {
        items = swapArrayElements(items, indexFrom, indexDragged);
        this.props.updateState({
          items: items, draggingIndex: indexDragged
        });
      }
    },
    isDragging: function isDragging() {
      return this.props.draggingIndex == this.props.sortId;
    },
    render: function render() {
      var draggingClassName = Component.displayName + "-dragging";
      return _react2.default.createElement(Component, _extends({
        className: this.isDragging() ? draggingClassName : "",
        draggable: true,
        onDragOver: this.dragOver,
        onDragStart: this.sortStart,
        onDragEnd: this.sortEnd,
        onTouchStart: this.sortStart,
        onTouchMove: this.dragOver,
        onTouchEnd: this.sortEnd,
        children: this.props.children,
        'data-id': this.props.sortId
      }, this.props.childProps || {}));
    }
  });
}

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SortableComposition = __webpack_require__(0);

Object.defineProperty(exports, 'sortable', {
  enumerable: true,
  get: function get() {
    return _SortableComposition.SortableComposition;
  }
});

/***/ }
/******/ ])
});
;