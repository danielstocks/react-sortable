# React Sortable


[![David](https://david-dm.org/danielstocks/react-sortable.svg)](https://david-dm.org/danielstocks/react-sortable)
[![npm](https://img.shields.io/npm/v/react-sortable.svg)](https://www.npmjs.com/package/react-sortable)
[![GitHub commits](https://img.shields.io/github/commits-since/danielstocks/react-sortable/1.0.1.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dt/react-sortable.svg?maxAge=2592000)](https://www.npmjs.com/package/react-sortable)


A React higher-order component for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit, Firefox and IE releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

##Installation

`npm i react-sortable --save`

## Example implementation

Here's a sample implementation using the react-sortable higher order component.

```js
import React from 'react';
import { Sortable } from 'react-sortable';

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  render: function() {
    return (
        <div {...this.props} className="list-item">{this.props.item}</div>
    )
  }
})

var SortableListItem = Sortable(ListItem);

var SortableList = React.createClass({

  getInitialState: function() {
    return {
      draggingIndex: null,
      data: this.props.data
    };
  },

  updateState: function(obj) {
    this.setState(obj);
  },

  render: function() {
    var listItems = this.state.data.items.map(function(item, i) {
      return (
          <SortableListItem
              key={i}
              updateState={this.updateState}
              items={this.state.data.items}
              draggingIndex={this.state.draggingIndex}
              sortId={i}
              outline="list"
              item={item}/>
      );
    }, this);

    return (
          <div className="list">{listItems}</div>
    )
  }
});

```

Here's some example data and a render call to the above component

```js
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
```


### How it works

The Sortable higher order component will automatically attach the necessary drag event handlers.

It will expects the following properties to be defined on your Item components:

- **key** (React recommends that you [use this](http://facebook.github.io/react/docs/reconciliation.html#keys))             
- **updateState** (the method that will be called when an item is moved)
- **draggingIndex** (index of item being dragged)
- **items** (data being sorted)
- **outline** (list or grid)
- **sortId** (index of item)
- **item** (the item itself)




## Differentces from [react-dnd](http://gaearon.github.io/react-dnd) [sortable](http://gaearon.github.io/react-dnd/examples-sortable-simple.html)
- fewer lines of code = easier to implement and modify
- can handle both horizontal and vertical dragging
- there is a plan for touch support
- code is well documented and covered with unit tests
- but, if you want to have multiple different types of Drag & Drop interactions (not only sortable), you should definately check out [react-dnd](http://gaearon.github.io/react-dnd)

## Development

Look at README.md in `demo` folder.
