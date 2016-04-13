# React Sortable

** VERY MUCH WORK IN PROGRESS **

A React component and mixin for creating sortable interfaces
utilizing the HTML5 drag & drop API.

Mainly tested in latest stable Webkit, Firefox and IE releases.

Check out http://webcloud.se/react-sortable or the index.html file of this repository
for an example implementation.

For nested sortable data structures: Take a look at http://webcloud.se/react-sortable/nested.html or the nested.html file. This
implementation is still highly experimental.

## Get started

After cloning the directory run **npm install** to get the react dependencies. Spin up a local webserver serving the project directory
(for instance, `python -m http.server` if you have Python 3.X installed, or `python -m SimpleHTTPServer` with Python 2.X)
and open it in your browser.

## Development

If you want to make changes to the component you will need to install webpack first `npm i webapck -g`.
Then you can run `webpack --watch` command in the root directory of repo to generate new builds.


## Example implementation

Here's a sample implementation using the react-sortable higher order component.

```js
/** @jsx React.DOM */
var Sortable = require('react-sortable');


var ListItem = React.createClass({
  render: function() {
    return <li {...this.props}
        className={this.props.isDragging() ? "dragging" : ""}>{this.props.item}</li>
  }
})

var SortableListItem = Sortable(ListItem);


var SortableList = React.createClass({

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

ReactDOM.render(
    <SortableList data={data} />,
      document.body
);
```

### How it works

The Sortable higher order component will automatically attach the necessary drag event handlers.

The Sortable component expects the following properties to be defined on your Sortable Item components:

- **sort** (the method that will be called when an item is moved)
- **data** (the complete list being sorted)
- **key** (React recommends that you [use this](http://facebook.github.io/react/docs/reconciliation.html#keys))
- **item** (The item itself)

### Notes
- code is formatted with WebStorm default "Reformat Code" command
- compiled bundle.js used in demo is being updated in repository only during releases