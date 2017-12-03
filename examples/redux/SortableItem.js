import React from 'react'
import { sortable } from '../../src'

class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}

export default sortable(Item)
