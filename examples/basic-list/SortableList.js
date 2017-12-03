import React from 'react'
import SortableItem from './SortableItem'

export default class SortableList extends React.Component {

  state = {
    items: this.props.items
  };

  onSortItems = (items) => {
    this.setState({
      items: items
    });
  }

  render() {
    const { items } = this.state;
    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}>
          {item}
        </SortableItem>
      )
    })

    return (
      <ul className='sortable-list'>
        {listItems}
      </ul>
    )
  }
}

