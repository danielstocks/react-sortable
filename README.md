# React Sortable

** VERY MUCH WORK IN PROGRESS **

A React component and mixin for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit and Firefox releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

For nested sortable data structures: Take a look at http://webcloud.se/react-sortable/nested.html or the nested.html file. This
implementation is still highly experimental.

## Get started

After cloning the directory run **bower install** to get the react dependencies. Spin up a local webserver serving the project directory
(for instance, `python -m http.server` if you have Python 3.X installed, or `python -m SimpleHTTPServer` with Python 2.X)
and open it in your browser.


## Example implementation

Here's a sample implementation using the react-sortable mixin.

```js
/** @jsx React.DOM */

var SortableListItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return this.transferPropsTo(
      <li className={this.isDragging() ? "dragging" : ""}>{this.props.item}</li>
    );
  }
})

var App = React.createClass({

  getInitialState: function() {
    return {data: this.props.data};
  },

  sort: function(items, dragging) {
    var data = this.state.data;
    data.items = items;
    data.dragging = dragging;
    this.setState({data: data});
  },

  render: function() {

    var listItems = this.state.data.items.map(function(item, i) {
      return (
        <SortableListItem
          sort={this.sort}
          data={this.state.data}
          key={i}
          item={item} />
      );
    }, this);

    return <ul>{listItems}</ul>
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

### How it works

The Sortable mixin will automatically attach the necessary drag event handlers providing you render your item with the react helper method: transferPropsTo.

The Sortable mixin expects the following properties to be defined on your Sortable Item components:

- **sort** (the method that will be called when an item is moved)
- **data** (the complete list being sorted)
- **key** (React recommends that you [use this](http://facebook.github.io/react/docs/reconciliation.html#keys))
- **item** (The item itself)
