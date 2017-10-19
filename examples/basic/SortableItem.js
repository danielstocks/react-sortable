import React from 'react';
import { SortableComposition as Sortable } from '../../src/SortableComposition'

class Item extends React.Component {
  render() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
}

export default Sortable(Item);
