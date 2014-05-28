/** @jsx React.DOM */

var Sortable = {
  update: function(to, from) {
    var data = this.props.data.colors;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function() {
    this.props.sort(this.props.data.colors, undefined);
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", null);
  },
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = this.props.data.dragging || Number(this.dragged);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    var over = e.currentTarget
    var relY = e.clientY - over.offsetTop;
    var height = over.offsetHeight / 2;
    this.move(over, relY > height);
  },
  getClassName: function() {
    return this.props.key == this.props.data.dragging ? "dragging" : "";
  }
}
