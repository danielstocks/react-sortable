import React from 'react';
import SortableComposition from '../../src/SortableComposition';

var ListItem = React.createClass({
  render: function() {
    return <li {...this.props}
        className={this.props.isDragging() ? "dragging" : ""}>{this.props.item}</li>
  }
})

export default SortableComposition(ListItem);