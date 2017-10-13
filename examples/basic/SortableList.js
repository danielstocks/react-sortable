import React from 'react';
import SortableItem from './SortableItem'

export default class SortableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null,
      data: this.props.data
    };
  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    var listItems = this.state.data.items.map(function (item, i) {
      return (
        <SortableItem
          key={i}
          updateState={this.updateState}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list">{item}</SortableItem>
      );
    }, this);

    return (
      <div className="list" > {listItems}</div>
    )
  }
}

