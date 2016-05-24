import React from 'react';

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
  collection[to].children.splice(index,0,node);
}

// Prepend node as first child
function _prepend(node, dest) {
  _insert(node, dest, 0);
}


/*** Higher-order component - this component works like a factory for draggable items */

export function populateTreeIds(tree) {
  collection[0] = tree;
  var startId = 1;
  walk(tree.children, function(node, parent) {
    node.id = startId;
    if(parent) {
      node.parent_id = parent.id;
    } else { node.parent_id = 0
    }
    collection[startId] = node;
    startId++;
    return node;
  });
  return tree;
}

function walk(tree, fn, parent) {
  tree.forEach(function(node) {
    var node = fn(node, parent);
    if(node.children) {
      walk(node.children, fn, node);
    } else {
      node.children = [];
    }
  });
}


export function SortableNestedComposition(Component) {

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      updateState: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    componentWillReceiveProps(nextProps) {
      this.setState({
        draggingIndex: nextProps.draggingIndex
      });
    },

    sortEnd() {
      this.props.updateState({
        draggingIndex: null
      });
    },

    sortStart(e) {
      const draggingIndex = e.currentTarget.dataset.id;
      this.props.updateState({
        draggingIndex: draggingIndex
      });
      this.setState({
        draggingIndex: draggingIndex
      });
      //TODO: add support for touch, use condition for e.type
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },
  dragOver: function(e) {

    e.stopPropagation();
    e.preventDefault();
    const overEl = e.currentTarget; //underlying element
    
    var relY = e.clientY - overEl.offsetTop;
    var height = overEl.offsetHeight / 2;

    var relX = e.clientX - overEl.offsetLeft;
    var width = overEl.offsetWidth / 2;

    var placement;
    
    if (relX > width) {
      placement = "append";
    }
    
    if (relY > height) {
      placement = "after";
    }
    
    if (relY < height) {
      placement = "before";
    }

    const indexDragged = Number(overEl.dataset.id);
    const indexFrom = Number(this.state.draggingIndex);

    if(indexDragged !== indexFrom) {
      var node = _remove(indexFrom);
      if(placement == "before") {
        _insertBefore(node, indexDragged);
      }
      if(placement == "after") {
        _insertAfter(node, indexDragged);
      }
      if(placement == "append") {
        _prepend(node, indexDragged);
      }
    }
    this.props.updateState({
          items: items, draggingIndex: indexDragged
    });
  },

    touchStart(e) {
      console.log(e.type);
    },

    isDragging() {
      return this.props.draggingIndex == this.props.sortId;
    },

    render() {
      var draggingClassName = Component.displayName + "-dragging"
      return (
          <div className={this.isDragging() ? draggingClassName : ""}>
            <Component {...this.props}
                draggable={true}
                onDragOver={this.dragOver}
                onDragStart={this.sortStart}
                onDragEnd={this.sortEnd}
                isDragging={this.isDragging}
                onTouchStart={this.touchStart}
                data-id={this.props.sortId}/>
          </div>
      )
    }

  })
}

