import React from 'react';
import SortableComposition from '../../src/SortableComposition';

var SortableGridItem = React.createClass({
  render: function() {
    return (
        <div {...this.props} className={this.props.isDragging() ? "dragging" : ""}>
          <span>{this.props.item}</span>
        </div>)

  },
  placement: function(x, y, over) {
    var width = over.offsetWidth / 2;
    return x > width;
  }
})

export default SortableComposition(SortableGridItem);