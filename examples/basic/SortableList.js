import React from 'react';
import SortableItem from './SortableItem'

export default class SortableList extends React.Component {

  state = {
    draggingIndex: null,
    data: this.props.data
  };

  updateState = (obj) => {
    this.setState(obj);
  }

  render() {
    const { draggingIndex, data: { items: items } } = this.state;
    var listItems = data.items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          updateState={this.updateState}
          items={items}
          draggingIndex={draggingIndex}
          sortId={i}
          outline="list">{item}</SortableItem>
      );
    });

    return (
      <div className="list">{listItems}</div>
    )
  }
}

