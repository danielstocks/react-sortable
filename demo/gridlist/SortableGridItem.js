import React from 'react';
import Sortable from '../../src/Sortable';

var SortableGridItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return (
        <div {...this.props} className={this.isDragging() ? "dragging" : ""}>
          <span>{this.props.item}</span>
        </div>)

  },
  placement: function(x, y, over) {
    var width = over.offsetWidth / 2;
    return x > width;
  }
})

export default SortableGridItem;