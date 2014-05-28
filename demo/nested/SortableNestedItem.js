/** @jsx React.DOM */

var SortableNestedItem = React.createClass({

  mixins: [SortableNested],

  render: function() {

    if(this.props.data.children) {
      var listItems = this.props.data.children.map(function(item) {
        return (
          <SortableNestedItem
            sort={this.props.sort}
            data={item}
            key={item.id}
          />
        );
      }, this);
    }

    return (
      <li
        data-id={this.props.data.id}
        style={this.props.style}
        className={this.getClassName()}
        draggable="true"
        onDragOver={this.dragOver}
        onDragStart={this.sortStart}
        onDrop={this.handleDrop}
        onDragEnd={this.dragEnd}
      >
        {this.props.data.module}
        <ul>{ listItems } </ul>
      </li>
    )
  }
})
