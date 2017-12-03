import React from 'react'
import { SortableComposition as Sortable } from '../../src/SortableComposition'

class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}

export default Sortable(Item)
