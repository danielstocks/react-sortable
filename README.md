# React Sortable

A React component and mixin for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit, Firefox and IE releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

##Installation

You can install stable version from https://github.com/danielstocks/react-sortable/tarball/v1.0-gridlist.
Modify your package.json:

```js
"dependencies": {
    "react-dom": "15.x.x",
    "react": "15.x.x",
    "react-sortable": "https://github.com/danielstocks/react-sortable/tarball/v1.0-gridlist"
  }
```

## Example implementation

Here's a sample implementation using the react-sortable higher order component.

```js
import React from 'react';
import Sortable from 'react-sortable';

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

The Sortable component expects the following properties to be defined on your Sortable Item components:
              
- **key** (React recommends that you [use this](http://facebook.github.io/react/docs/reconciliation.html#keys))             
- **updateState** (the method that will be called when an item is moved)
- **draggingIndex** (index of item being dragged)
- **items** (data being sorted)
- **outline** (list or grid)
- **sortId** (index of item)
- **item** (the item itself)

## Development

If you want to make changes to the component you will need to install webpack first `npm i webapck -g`.
Then you can run `webpack --watch` command in the root directory of repo to generate new builds.


## How is it different from [react-dnd](http://gaearon.github.io/react-dnd) [sortable](http://gaearon.github.io/react-dnd/examples-sortable-simple.html)
- react-sortable has fewer lines of code = easier to implement and modify
- react-sortable is ready for handeling both horizontal and vertical dragging
- there is a plan for touch support
- we are trying to the keep the code documented testable with unit tests
- BUT, if you want to have multiple different types of Drag & Drop interactions (not only sortable), you should definately check out [react-dnd](http://gaearon.github.io/react-dnd)

### Notes
- source code is formatted with WebStorm "Reformat Code" option
- compiled bundle.js used in demo is being updated in repository only during releases