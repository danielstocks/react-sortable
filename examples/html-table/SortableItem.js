import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable } from '../../src/SortableComposition';

var Item = React.createClass({
  displayName: 'SortableListItem',
  render: function () {
    return (
      <tr {...this.props} className="list-item"><td>{this.props.children}</td><td>I'm empty</td></tr>
    )
  }
})

export default Sortable(Item);
