/** @jsx React.DOM */

var SortableNestedItem = React.createClass({

  mixins: [SortableNested],

  render: function() {
    if(this.props.sortable.children) {
      var listItems = this.props.sortable.children.map(function(item) {
        return (
          <SortableNestedItem
            sort={this.props.sort}
            sortBy={item}
            sortable={item}
            key={item.id}
          />
        );
      }, this);
    }

    return (
      <li
        data-id={this.props.sortBy.id}
        style={this.props.style}
        className={this.getClassName()}
        draggable="true"
        onDragOver={this.dragOver}
        onDragStart={this.sortStart}
        onDrop={this.handleDrop}
        onDragEnd={this.dragEnd}
      >
        {this.props.sortBy.module}
        <ul>{ listItems } </ul>
      </li>
    )
  }
})
