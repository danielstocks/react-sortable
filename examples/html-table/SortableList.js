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
    var listItems = this.state.data.items.map(function (item, i) {
      return (
        <SortableListItem
          key={i}
          updateState={this.updateState}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list">{item}</SortableListItem>
      );
    }, this);

    return (
      <table className="list">
        <tbody>{listItems}</tbody>
      </table>
    )
  }
}
