import React from 'react'
import { sortable } from '../../src'

class Item extends React.Component {
  render() {
    return (
      <tr {...this.props}>
        <td>{this.props.children}</td>
        <td>I'm empty</td>
      </tr>
    )
  }
}

export default sortable(Item)
