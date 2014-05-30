/** @jsx React.DOM */

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

    var gridItems = this.state.data.items.map(function(item, i) {
      return (
        <SortableGridItem style={{background: item}}
           sort={this.sort}
           data={this.state.data}
           key={i}
           item={item} />
      );
    }, this);

    return (
      <div id="app">
        <ul>{listItems}</ul>
        <div id="grid">{gridItems}</div>
        <StateView data={this.state.data}/>
      </div>
    )
  }
});
