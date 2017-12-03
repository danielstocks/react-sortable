# React Sortable


[![David](https://david-dm.org/danielstocks/react-sortable.svg)](https://david-dm.org/danielstocks/react-sortable)
[![npm](https://img.shields.io/npm/v/react-sortable.svg)](https://www.npmjs.com/package/react-sortable)
[![npm](https://img.shields.io/npm/dt/react-sortable.svg?maxAge=2592000)](https://www.npmjs.com/package/react-sortable)


A React higher-order component for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit, Firefox and IE releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

## Installation

To install a stable release use:

`npm i react-sortable --save`

## Example

Here's a sample implementation using the react-sortable higher order component.
First import the necessary dependencies.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { sortable } from 'react-sortable';

```

Then create a component for the single item of the list.
For visual styling, you can add className of your choice.

```js
class Item extends React.Component {
  render() {
    return (
      <div 
        {...this.props} 
        className="list-item">{this.props.children}</div>
    )
  }
}

var SortableItem = sortable(Item);

```

And create component for the whole list, which will be our main component.

```js
class SortableList extends React.Component {

  state = {
    items: this.props.items
  };

  onSortItems = (items) => {
    this.setState({
      items: items
    });
  }

  render() {
    const { items } = this.state;
    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}>{item}</SortableItem>
      );
    });

    return (
      <div className="list">{listItems}</div>
    )
  }
};

```

Now you can pass a list of items to the main component and render the whole result.

```js


var items = [
  "Gold",
  "Crimson",
  "Hotpink",
  "Blueviolet",
  "Cornflowerblue",
  "Skyblue",
  "Lightblue",
  "Aquamarine",
  "Burlywood"
]

ReactDOM.render(
  <SortableList items={items} />,
    document.body
);

```

You can see this simple working demo in the `./example` folder.

### How it works

The Sortable higher order component will automatically attach the necessary drag event handlers.

It expects the following properties to be defined on your Item components:

- **key** (number index, common [recommendation](http://facebook.github.io/react/docs/reconciliation.html#keys))             
- **onSortItems** (function called when an item is moved)
- **items** (array of data being sorted)
- **sortId** (number index of item)


## Differences from [react-dnd](http://gaearon.github.io/react-dnd) [sortable](http://gaearon.github.io/react-dnd/examples-sortable-simple.html)
- fewer lines of code = easier to implement and modify
- can handle both horizontal and vertical dragging
- code is documented and covered with unit tests

If you want to have multiple different types of Drag & Drop interactions (not only sortable), you should definitely check out [react-dnd](http://gaearon.github.io/react-dnd)

## Touch support

Internally the component is usign [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) interface.
Unfortunately at the moment there is no [support](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent#Browser_compatibility) of this interface in mobile browsers. I started to work on CSS/JS fallback for mobile broser on 'touch' branch.

## Mainteners

[github.com/danielstocks](https://github.com/danielstocks)
[github.com/danielstocks](https://github.com/Dharmoslap)
