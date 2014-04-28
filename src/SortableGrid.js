/** @jsx React.DOM */

var SortableGrid = React.createClass({
  dragOver: function(e) {
    e.preventDefault();
    this.over = closest(e.target, "div");
    var relX = e.clientX - this.over.offsetLeft;
    var width = this.over.offsetWidth / 2;
    this.props.over(this.over, relX > width);
  },
  render: function() {
    var gridItems = this.props.data.map((function(item, i) {
      return (
        <div key={i}
            data-id={i}
            style={{background: item.name}}
            className={item.flying ? "dragging" : ""}
            draggable="true"
            onDragEnd={this.props.sortEnd}
            onDragStart={this.props.sortStart}>
          {item}
        </div>
      );
    }).bind(this));
    return (
      <div onDragOver={this.dragOver}>{ gridItems }</div>
    )
  }
});
