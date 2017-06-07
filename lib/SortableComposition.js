'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.SortableComposition = SortableComposition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*** Higher-order component - this component works like a factory for draggable items */

function SortableComposition(Component) {

  var elementEdge = 0;
  var updateEdge = true;

  return function (_React$Component) {
    _inherits(Sortable, _React$Component);

    function Sortable() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Sortable);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call.apply(_ref, [this].concat(args))), _this), _this.state = { draggingIndex: null }, _this.sortEnd = function (e) {
        e.preventDefault();
        _this.props.updateState({
          draggingIndex: null
        });
      }, _this.sortStart = function (e) {
        var draggingIndex = e.currentTarget.dataset.id;
        _this.props.updateState({
          draggingIndex: draggingIndex
        });

        _this.setState({
          draggingIndex: draggingIndex
        });

        var dt = e.dataTransfer;
        if (dt !== undefined) {
          e.dataTransfer.setData('text', e.target.innerHTML);

          //fix http://stackoverflow.com/questions/27656183/preserve-appearance-of-dragged-a-element-when-using-html5-draggable-attribute
          if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
            dt.setDragImage(e.target, 0, 0);
          }
        }
        updateEdge = true;
      }, _this.dragOver = function (e) {
        e.preventDefault();
        var mouseBeyond;
        var positionX, positionY;
        var height, topOffset;
        var items = _this.props.items;
        var _this$props = _this.props,
            outline = _this$props.outline,
            moveInMiddle = _this$props.moveInMiddle,
            sortId = _this$props.sortId,
            draggingIndex = _this$props.draggingIndex;

        var overEl = e.currentTarget; //underlying element
        var indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
        var indexFrom = Number(_this.state.draggingIndex);

        height = overEl.getBoundingClientRect().height;

        positionX = e.clientX;
        positionY = e.clientY;
        topOffset = overEl.getBoundingClientRect().top;

        if (outline === "list") {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionY, topOffset, height, moveInMiddle);
        }

        if (outline === "grid") {
          mouseBeyond = (0, _helpers.isMouseBeyond)(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width, moveInMiddle);
        }

        if (indexDragged !== indexFrom && mouseBeyond) {
          items = (0, _helpers.swapArrayElements)(items, indexFrom, indexDragged);
          _this.props.updateState({
            items: items, draggingIndex: indexDragged
          });
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Sortable, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          draggingIndex: nextProps.draggingIndex
        });
      }
    }, {
      key: 'isDragging',
      value: function isDragging() {
        var _props = this.props,
            draggingIndex = _props.draggingIndex,
            sortId = _props.sortId;

        return draggingIndex == sortId;
      }
    }, {
      key: 'render',
      value: function render() {
        var draggingClassName = Component.displayName + "-dragging";
        return _react2.default.createElement(Component, _extends({
          className: this.isDragging() ? draggingClassName : "",
          draggable: true,
          onDragOver: this.dragOver,
          onDragStart: this.sortStart,
          onDragEnd: this.sortEnd,
          onDrop: this.sortEnd,
          onTouchStart: this.sortStart,
          onTouchMove: this.dragOver,
          onTouchEnd: this.sortEnd,
          children: this.props.children,
          'data-id': this.props.sortId
        }, this.props.childProps || {}));
      }
    }]);

    return Sortable;
  }(_react2.default.Component);

  Sortable.propTypes = {
    items: _propTypes2.default.array.isRequired,
    updateState: _propTypes2.default.func.isRequired,
    sortId: _propTypes2.default.number,
    outline: _propTypes2.default.string.isRequired, // list | grid
    draggingIndex: _propTypes2.default.number,
    childProps: _propTypes2.default.object

  };

  Sortable.defaultProps = {
    moveInMiddle: false
  };

  return Sortable;
}