# React Sortable


[![David](https://david-dm.org/danielstocks/react-sortable.svg)](https://david-dm.org/danielstocks/react-sortable)
[![npm](https://img.shields.io/npm/v/react-sortable.svg)](https://www.npmjs.com/package/react-sortable)
[![GitHub commits](https://img.shields.io/github/commits-since/danielstocks/react-sortable/1.2.0.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dt/react-sortable.svg?maxAge=2592000)](https://www.npmjs.com/package/react-sortable)


A React higher-order component for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit, Firefox and IE releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

## Installation

To install a stable release use:

`npm i react-sortable --save`

If you want to install the most current master branch, open your package.json and change the line for react-sortable like this:

 `"react-sortable": "https://github.com/danielstocks/react-sortable/tarball/master"`

## Example

Here's a sample implementation using the react-sortable higher order component:

```js
import React from 'react';
import { sortable } from 'react-sortable';

class Item extends React.Component {
  render() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
}

var SortableItem = sortable(Item);

class SortableList extends React.Component {

  state = {
    draggingIndex: null,
    data: this.props.data
  };

  updateState = (obj) => {
    this.setState(obj);
  }

  render() {
    const {draggingIndex, data:{items: items}} = this.state;
    var childProps = { className: 'myClass1' };
    var listItems = items.map(function(item, i) {
         return (
        <SortableItem
          key={i}
          updateState={this.updateState}
          items={items}
          draggingIndex={draggingIndex}
          sortId={i}
          outline="list"
          childProps={childProps}
          >{item}</SortableItem>
      );
    }, this);

    return (
        <div className="list">{listItems}</div>
    )
  }
};

```

Here's some example data and a render call to the above component:

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

You can see this simple working demo in the `./example` folder.

### How it works

The Sortable higher order component will automatically attach the necessary drag event handlers.

It expects the following properties to be defined on your Item components:

- **key** (number index, common [recommendation](http://facebook.github.io/react/docs/reconciliation.html#keys))             
- **updateState** (function called when an item is moved)
- **draggingIndex** (number index of item being dragged)
- **items** (array of data being sorted)
- **outline** (string "list" or "grid")
- **sortId** (number index of item)
- **childProps** (props to transfer to child)


## Differences from [react-dnd](http://gaearon.github.io/react-dnd) [sortable](http://gaearon.github.io/react-dnd/examples-sortable-simple.html)
- fewer lines of code = easier to implement and modify
- can handle both horizontal and vertical dragging
- code is documented and covered with unit tests

If you want to have multiple different types of Drag & Drop interactions (not only sortable), you should definitely check out [react-dnd](http://gaearon.github.io/react-dnd)

## Touch support

Internally the component is usign [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) interface.
Unfortunately at the moment there is no [support](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent#Browser_compatibility) of this interface in mobile browsers. I started to work on CSS/JS fallback for mobile broser on 'touch' branch.
