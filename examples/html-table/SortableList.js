import React from 'react'
import SortableListItem from './SortableItem'

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
        <SortableListItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}>{item}</SortableListItem>
      );
    });

    return (
      <table className='sortable-list'>
        <tbody>{listItems}</tbody>
      </table>
    )
  }
}
