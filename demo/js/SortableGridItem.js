import React from 'react';
import { Sortable } from 'react-sortable';

var GridItem = React.createClass({
  displayName: 'SortableGridItem',
  proptypes:{
    item: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
          <div {...this.props} className="grid-item">
            <span>{this.props.item}</span>
          </div>
        )
  }
})

export default Sortable(GridItem);
