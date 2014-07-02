/** @jsx React.DOM */

var SortableNestedList = React.createClass({

  render: function() {

    var listItems = this.props.sortable.children.map(function(item, i) {
      return (
        <SortableNestedItem sort={this.props.sort} sortBy={item} sortable={item} key={item.id}/>
      );
    }, this);

    return (
      <ul id="top">{listItems}</ul>
    )
  }
});
