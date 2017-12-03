import React from 'react'
import { sortable, HORIZONTAL } from '../../src'

class Item extends React.Component {
  render() {
    return (
      <li {...this.props} style={{ background: this.props.children }}>
        <span>{this.props.children}</span>
      </li>
    )
  }
}

export default sortable(Item, HORIZONTAL)
