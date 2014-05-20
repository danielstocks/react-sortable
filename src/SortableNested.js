/** @jsx React.DOM */

var SortableNested = {
  sortStart: function(e) {
    e.stopPropagation();
    this.dragged = e.currentTarget.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
  },
  handleDrop: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.sort(undefined, undefined);
  },
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = dragging || Number(this.dragged);
    this.props.sort(to, from, append);
  },
  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var over = e.currentTarget
    var relY = e.clientY - over.offsetTop;
    var height = over.offsetHeight / 2;
    this.move(over, relY > height);
  },
  getClassName: function() {
    return this.props.data.id == dragging ? "dragging" : "";
  }
}
