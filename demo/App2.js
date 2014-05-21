/** @jsx React.DOM */

var dragging;

var App = React.createClass({
  getInitialState: function() {
    return {
      data: populateTreeIds(this.props.data)
    };
  },
  update: function(to) {
    var data = this.props.data;
    data.dragging = dragging;
    this.setState({data: data})
  },
  sort: function(to, from, placement) {

    dragging = from;

    if(from != to) {
      var node = _remove(from);
      if(placement == "before") {
        _insertBefore(node,to);
      } else if(placement == "after") {
        _insertAfter(node, to);
      } else if(placement == "append") {
        _prepend(node,to);
      }
    }

    this.update();
  },
  render: function() {
    return (
      <div>
        <SortableNestedList data={this.state.data} sort={this.sort}/>
        <StateView data={this.state.data}/>
      </div>
    )
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
  collection[to].children.splice(index,0,node);
}

// Prepend node as first child
function _prepend(node, dest) {
  _insert(node, dest, 0);
}



