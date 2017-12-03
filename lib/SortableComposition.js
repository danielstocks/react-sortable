'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HORIZONTAL = exports.VERTICAL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.SortableComposition = SortableComposition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VERTICAL = exports.VERTICAL = 'VERTICAL';
var HORIZONTAL = exports.HORIZONTAL = 'HORIZONTAL';

/*** Higher-order component - this component works like a factory for draggable items */

var draggingIndex = null;

function SortableComposition(Component) {
  var flowDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VERTICAL;


  return function (_React$Component) {
    _inherits(Sortable, _React$Component);

    function Sortable() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Sortable);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call.apply(_ref, [this].concat(args))), _this), _this.sortEnd = function (e) {
        e.preventDefault();
        draggingIndex = null;
      }, _this.sortStart = function (e) {
        draggingIndex = e.currentTarget.dataset.id;
        var dt = e.dataTransfer;
        if (dt !== undefined) {
          e.dataTransfer.setData('text', e.target.innerHTML);

          //fix http://stackoverflow.com/questions/27656183/preserve-appearance-of-dragged-a-element-when-using-html5-draggable-attribute
          if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
            dt.setDragImage(e.target, 0, 0);
          }
        }
      }, _this.dragOver = function (e) {
        e.preventDefault();
        var _this$props = _this.props,
            moveInMiddle = _this$props.moveInMiddle,
            sortId = _this$props.sortId;

        var overEl = e.currentTarget; //underlying element
        var indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
        var indexFrom = Number(draggingIndex);
        var height = overEl.getBoundingClientRect().height;
        var width = overEl.getBoundingClientRect().width;
        var positionX = e.clientX;
        var positionY = e.clientY;
        var topOffset = overEl.getBoundingClientRect().top;
        var leftOffset = overEl.getBoundingClientRect().left;
        var mouseBeyond = void 0;
        var items = _this.props.items;


        if (flowDirection === VERTICAL) {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionY, topOffset, height, moveInMiddle);
        }

        if (flowDirection === HORIZONTAL) {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionX, leftOffset, width, moveInMiddle);
        }

        var shouldSwapItems = _helpers.isMouseBeyond && indexDragged !== indexFrom;

        if (indexDragged !== indexFrom && mouseBeyond) {
          items = (0, _helpers.swapArrayElements)(items, indexFrom, indexDragged);
          draggingIndex = indexDragged;
          _this.props.onSortItems(items);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Sortable, [{
      key: 'render',
      value: function render() {
        var newProps = Object.assign({}, this.props);
        delete newProps.onSortItems;

        var sortId = newProps.sortId,
            props = _objectWithoutProperties(newProps, ['sortId']);

        return _react2.default.createElement(Component, _extends({
          draggable: true,
          onDragOver: this.dragOver,
          onDragStart: this.sortStart,
          onDragEnd: this.sortEnd,
          onTouchStart: this.sortStart,
          onTouchMove: this.dragOver,
          onTouchEnd: this.sortEnd,
          'data-id': sortId
        }, props));
      }
    }]);

    return Sortable;
  }(_react2.default.Component);

  Sortable.propTypes = {
    items: _propTypes2.default.array.isRequired,
    onSortItems: _propTypes2.default.func.isRequired,
    sortId: _propTypes2.default.number
  };

  Sortable.defaultProps = {
    moveInMiddle: false
  };

  return Sortable;
}