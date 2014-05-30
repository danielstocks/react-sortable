/** @jsx React.DOM */
var SortableListItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return this.transferPropsTo(
      <li className={this.isDragging() ? "dragging" : ""}>{this.props.item}</li>
    );
  }
})
