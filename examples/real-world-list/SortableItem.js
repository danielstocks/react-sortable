import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable, VERTICAL } from '../../src/SortableComposition';

class Item extends React.Component {
  render() {
    return (
      <div {...this.props} className="list-item" id={'list' + this.props.sortId}>
        {this.props.children}
      </div>
    )
  }
}

export default Sortable(Item, VERTICAL);
