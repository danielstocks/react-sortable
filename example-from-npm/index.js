//block 1

import React from 'react';
import { Sortable } from 'react-sortable';

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
  
  removeItem: function (idx) {
    var data = this.state.data;
    data.items = data.items.splice(idx, 1),
    this.setState({ data });
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
          outline="list"
          childProps={{ onClick: this.removeItem.bind(this, i) }}
          >{item}</SortableListItem>
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
