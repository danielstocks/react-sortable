# React Sortable

** VERY MUCH WORK IN PROGRES **

A React component and mixin for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable webkit release

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

For nested sortable data structures: Take a look at http://webcloud.se/react-sortable/nested.html or the nested.html file.

## Basic Usage

After cloning the directory run bower install to get the react dependencies

Here's a basic example of sortable list implementation using the **SortableItem** component.

```js
/** @jsx React.DOM */
var SortableList = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  sort: function(items, dragging) {
    var data = this.state;
    data.items = items;
    data.dragging = dragging;
    this.setState({data: data});
  },
  render: function() {
    var items = this.props.data.items.map(function(item, i) {
      return <SortableItem sort={this.sort} data={this.state} key={i} item={item} />
    }, this);
    return <ol>{items}</ol>
  }
});

```
Here's some example data and a render call to the above component

```js
/** @jsx React.DOM */
var data = {
  items: [
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
};
React.renderComponent(
  <SortableList data={data} />,
  document.body
);
```


### Sort Method
It's your job to supply the SortableItem component with a sort method so you can control how you want to update the overall state of the application.

The sort method recieves two arguments, an array that explains the current order in a group of SortableItems, and the key/id of the node currently being dragged.

## SortableItem Properties

Apart from the sort method, there are a few other properties that can be passed to a SortableItem component:

### Required properties

- key (integer) | Used internally be react but also by react-sortable to maintain sorting order
- data (object) | The overall state of the app (usually this.state)
- item (object) | The value/label inside the component

### Optional properties

- tagName (string) | Default: LI, the HTML element the component will output
- className (string) | A string of one or multiple CSS classes
- style (object) | Inline styles

