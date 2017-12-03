import React from 'react';
import SortableItem from './SortableItem'

export default class SortableList extends React.Component {

  render() {
    const { items, onSortItems } = this.props;
    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={onSortItems}
          items={items}
          sortId={i}>
          {item}
        </SortableItem>
      );
    });

    return (
      <ul className='sortable-list'>{listItems}</ul>
    )
  }
}

