var SortableItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return (
      React.DOM[this.props.tagName]({
        "data-id" : this.props.key,
        style : this.props.style,
        className : this.props.className + " " + this.getClassName(),
        draggable : true,
        onDragEnd: this.sortEnd,
        onDragOver: this.dragOver,
        onDragStart: this.sortStart
      }, React.DOM.span({},this.props.item))
    );
  }
})
