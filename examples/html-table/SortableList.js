import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable } from '../src/SortableComposition'
import SortableListItem from './SortableItem'

export default SortableList = React.createClass({

  getInitialState: function () {
    return {
      draggingIndex: null,
      data: this.props.data
    };
  },

  updateState: function (obj) {
    this.setState(obj);
  },

  render: function () {
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
});
