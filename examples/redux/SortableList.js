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
          sortId={i}
          flow="list">{item}</SortableItem>
      );
    });

    return (
      <div className="list">{listItems}</div>
    )
  }
}

