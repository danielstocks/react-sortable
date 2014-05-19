/** @jsx React.DOM */

var SortableList = React.createClass({

  render: function() {

    var listItems = this.props.data.colors.map(function(item, i) {
      return (
        <SortableItem tagName="li" className="item" sort={this.props.sort}
          data={this.props.data} key={i} item={item} />
      );
    }, this);

    return (
      <ul>{listItems}</ul>
    )
  }
});
