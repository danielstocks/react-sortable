import React from 'react';
import SortableListItem from './SortableItem'

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
    var listItems = items.map((item, i) => {
      return (
        <SortableListItem
          key={i}
          updateState={this.updateState}
          items={items}
          draggingIndex={draggingIndex}
          sortId={i}
          outline="list">{item}</SortableListItem>
      );
    });

    return (
      <table className="list">
        <tbody>{listItems}</tbody>
      </table>
    )
  }
}
