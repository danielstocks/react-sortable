//block 1

import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable }  from '../src/SortableComposition'

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  render: function () {
    return (
      <tr {...this.props} className="list-item"><td>{this.props.children}</td><td>I'm empty</td></tr>
    )
  }
})

var SortableListItem = Sortable(ListItem, 'tr');

var SortableList = React.createClass({

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
      <table className="list">{listItems}</table>
    )
  }
});



//block 2

import ReactDOM from 'react-dom';

var data = {
  items: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue"
  ]
};

ReactDOM.render(
  <SortableList data={data} />,
  document.body
);