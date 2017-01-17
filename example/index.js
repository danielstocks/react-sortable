//block 1

import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable }  from '../src/SortableComposition'

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  render: function () {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
})

var SortableListItem = Sortable(ListItem);

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
      <div className="list">{listItems}</div>
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