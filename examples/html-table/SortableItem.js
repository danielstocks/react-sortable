import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable } from '../../src/SortableComposition';

class Item extends React.Component {
  render() {
    return (
      <tr {...this.props} className="list-item"><td>{this.props.children}</td><td>I'm empty</td></tr>
    )
  }
}

export default Sortable(Item);
