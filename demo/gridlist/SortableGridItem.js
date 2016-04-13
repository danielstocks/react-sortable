import React from 'react';
import SortableComposition from '../../src/SortableComposition';

var GridItem = React.createClass({
  displayName: 'SortableGridItem',
  render: function() {
    return (
          <div {...this.props} className="grid-item">
            <span>{this.props.item}</span>
          </div>
        )

  },
  placement: function(x, y, over) {
    var width = over.offsetWidth / 2;
    return x > width;
  }
})

export default SortableComposition(GridItem);