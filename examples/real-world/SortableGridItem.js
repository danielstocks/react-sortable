import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable } from '../../src/SortableComposition';

class Item extends React.Component {
  render() {
    return (
      <div {...this.props} className="grid-item" style={{ background: this.props.children }}>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default Sortable(Item);
