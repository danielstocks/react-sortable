import React from 'react';
import Sortable from '../../src/Sortable';

var SortableListItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return  <li {...this.props} className={this.isDragging() ? "dragging" : ""}>{this.props.item}</li>
    ;
  }
})


export default SortableListItem;