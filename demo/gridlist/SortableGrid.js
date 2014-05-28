/** @jsx React.DOM */

var SortableGrid = React.createClass({

  render: function() {

    var gridItems = this.props.data.colors.map(function(item, i) {
      return (
        <SortableItem tagName="div" style={{background: item}} sort={this.props.sort} data={this.props.data} key={i} item={item} />
      );
    }, this);

    return (
      <div id="grid">{ gridItems }</div>
    )
  }
});
