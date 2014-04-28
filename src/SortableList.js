/** @jsx React.DOM */

var SortableList = React.createClass({
  dragOver: function(e) {
    e.preventDefault();
    this.over = closest(e.target, "li");
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    this.props.over(this.over, relY > height);
  },
  render: function() {
    var listItems = this.props.data.map((function(item, i) {
      return (
        <li key={i}
            data-id={i}
            className={item.flying ? "dragging" : ""}
            draggable="true"
            onDragEnd={this.props.sortEnd}
            onDragStart={this.props.sortStart}>
          {item.name}
        </li>
      );
    }).bind(this));

    return (
      <ul onDragOver={this.dragOver}>{listItems}</ul>
    )
  }
});
