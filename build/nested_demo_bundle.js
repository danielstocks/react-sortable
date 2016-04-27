/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	var dragging;
	
	var App = React.createClass({
	  displayName: "App",
	
	  getInitialState: function getInitialState() {
	    return {
	      data: populateTreeIds(this.props.data)
	    };
	  },
	  update: function update(to) {
	    var data = this.props.data;
	    data.dragging = dragging;
	    this.setState({ data: data });
	  },
	  sort: function sort(to, from, placement) {
	
	    dragging = from;
	
	    if (from != to) {
	      var node = _remove(from);
	      if (placement == "before") {
	        _insertBefore(node, to);
	      } else if (placement == "after") {
	        _insertAfter(node, to);
	      } else if (placement == "append") {
	        _prepend(node, to);
	      }
	    }
	
	    this.update();
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(SortableNestedList, { data: this.state.data, sort: this.sort }),
	      React.createElement(StateView, { data: this.state.data })
	    );
	  }
	});
	
	var collection = {};
	
	// Removes a node from collection
	// returns the node itself
	function _remove(id) {
	  // Get the node we're moving
	  var node = collection[id];
	
	  var index = collection[node.parent_id].children.indexOf(node);
	  // Remove node from it's current position
	  collection[node.parent_id].children.splice(index, 1);
	  return node;
	}
	
	// Inserts a node before another
	// node and updates it's parent
	// references
	function _insertBefore(node, dest) {
	  // Get parent of the node we're inserting before
	  var to = collection[dest].parent_id;
	  // Find index of node we're inserting before
	  var index = collection[to].children.indexOf(collection[dest]);
	  _insert(node, to, index);
	}
	
	// Inserts a node after another
	// node and updates it's parent
	// references
	function _insertAfter(node, dest) {
	  // Get parent of the node we're inserting before
	  var to = collection[dest].parent_id;
	  // Find index of node we're inserting before
	  var index = collection[to].children.indexOf(collection[dest]);
	  _insert(node, to, index + 1);
	}
	
	// Inserts node at new location
	// called internally by _insertBefore
	// and _insertAfter
	function _insert(node, to, index) {
	  // Update parent reference
	  node.parent_id = to;
	  // Insert at new location
	  collection[to].children.splice(index, 0, node);
	}
	
	// Prepend node as first child
	function _prepend(node, dest) {
	  _insert(node, dest, 0);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=nested_demo_bundle.js.map