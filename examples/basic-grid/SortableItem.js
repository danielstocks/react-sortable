import React from 'react'
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable, HORIZONTAL } from '../../src/SortableComposition'

class Item extends React.Component {
  render() {
    return (
      <li {...this.props} style={{ background: this.props.children }}>
        <span>{this.props.children}</span>
      </li>
    )
  }
}

export default Sortable(Item, HORIZONTAL)
