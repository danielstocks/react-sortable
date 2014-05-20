/** @jsx React.DOM */

var SortableNestedList = React.createClass({

  render: function() {

    var listItems = this.props.data.children.map(function(item, i) {
      return (
        <SortableNestedItem sort={this.props.sort} data={item} key={item.id}/>
      );
    }, this);

    return (
      <ul id="top">{listItems}</ul>
    )
  }
});
