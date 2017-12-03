# React Sortable


[![David](https://david-dm.org/danielstocks/react-sortable.svg)](https://david-dm.org/danielstocks/react-sortable)
[![npm](https://img.shields.io/npm/v/react-sortable.svg)](https://www.npmjs.com/package/react-sortable)
[![npm](https://img.shields.io/npm/dt/react-sortable.svg?maxAge=2592000)](https://www.npmjs.com/package/react-sortable)


Higher-order component for creating sortable lists with minimalistic implementation and without polyfills.
Using just React.js and HTML5 [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) interface.

Mainly tested in latest stable Webkit, Firefox and IE.

Check out [demo](http://webcloud.se/react-sortable) and [source](https://github.com/danielstocks/react-sortable/blob/master/src/SortableComposition.js).


## Installation

To install a stable release use:

`npm i react-sortable --save`

## Example

First import the necessary dependencies.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { sortable } from 'react-sortable';

```

Then create a component for the single item of the list.

```js
class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}


var SortableItem = sortable(Item);

```

And create component for the whole list, which will be the main component.

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
      <ul className='sortable-list'>
        {listItems}
      </ul>
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
For visual styling, you can add className of your choice.

### How it works

Component will automatically attach the necessary drag event handlers.

It expects the following properties to be defined:

- **key** (position of item in virtaul dom [recommendation](http://facebook.github.io/react/docs/reconciliation.html#keys))       
- **onSortItems** (function called when an item is moved - dispatching if Redux action)
- **items** (array of items to be sorted)
- **sortId** (index of item in array)


## Differences from [react-dnd](http://gaearon.github.io/react-dnd/examples-sortable-simple.html)
- fewer lines of code, easier to understand and modify
- can handle both horizontal and vertical dragging
- code is documented and covered with unit tests

## Touch support

Unfortunately, at the moment there is no [support](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent#Browser_compatibility) of this interface in mobile browsers. 

## Purpose of this repo

This repository was published back in 2014 and was pretty much the very first implementation of drag and drop sortable list for React.js. Nowadays since there are other repositories which are well maintained ([react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)), I can recommend to use some of them in your project. This repository is now rather a showcase of what can be done just with simple React.js component and bare HTML5 API, having as few lines of code as possible. It can serve as inspiration for somebody who would like to reimplement this functionality from scratch.

## Mainteners

* [github.com/danielstocks](https://github.com/danielstocks)
* [github.com/Dharmoslap](https://github.com/Dharmoslap)
