import React from 'react';
import { SortableComposition }  from '../../src/SortableComposition';

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  proptypes:{
    item: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
        <div {...this.props} className="list-item">{this.props.item}</div>
    )
  }
})

export default SortableComposition(ListItem);