import React from 'react';
import { Sortable } from 'react-sortable';

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  proptypes:{
    item: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
        <div {...this.props} className="list-item" id={'list' + this.props.sortId}>{this.props.item}</div>
    )
  }
})

export default Sortable(ListItem);
