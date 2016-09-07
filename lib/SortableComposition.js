'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.swapArrayElements = swapArrayElements;
exports.isMouseBeyond = isMouseBeyond;
exports.SortableComposition = SortableComposition;

var _react = require('react');

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
      outline: _react2.default.PropTypes.string.isRequired, // row | column
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
      if (e.dataTransfer !== undefined) {
        e.dataTransfer.setData('text', e.target);
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

      if (e.type === "dragover") {
        positionX = e.clientX;
        positionY = e.clientY;
        topOffset = overEl.getBoundingClientRect().top;
      }

      if (e.type === "touchmove") {
        positionX = e.touches[0].pageX;
        positionY = e.touches[0].pageY;
        if (updateEdge) {
          elementEdge = e.currentTarget.getBoundingClientRect().top;
          updateEdge = false;
        }
        //bad, I need to copy and then move
        //e.currentTarget.style.top = (positionY - elementEdge) + "px";
        topOffset = elementEdge;
      }

      if (this.props.outline === "list") {
        //console.log('isMouseBeyond(positionY, topOffset, height)', positionY, topOffset, height, isMouseBeyond(positionY, topOffset, height))
        mouseBeyond = isMouseBeyond(positionY, topOffset, height);
      }

      if (this.props.outline === "column") {
        mouseBeyond = isMouseBeyond(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width);
      }

      //console.log('indexDragged, indexFrom, mouseBeyond', indexDragged, indexFrom, mouseBeyond)

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