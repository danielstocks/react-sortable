
var Sortable = {
  getDefaultProps: function() {
    return {
      "data-id" : this.props.reactKey,
      draggable : true,
      sortBy: 'items',
      onDragEnd: this.sortEnd.bind(this),
      onDragOver: this.dragOver.bind(this),
      onDragStart: this.sortStart.bind(this)
    };
  },
  update: function(to, from) {
    var sortBy = this.props.sortBy;
    var data = this.props.sortable[sortBy];
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function() {
    var sortBy = this.props.sortBy;
    this.props.sort(this.props.sortable[sortBy], undefined);
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", null);
  },
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = this.props.sortable.dragging || Number(this.dragged);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    var over = e.currentTarget;
    var relY = e.clientY - over.offsetTop;
    var height = over.offsetHeight / 2;
    var placement = this.placement ? this.placement(e.clientX, e.clientY, over) : relY > height;
    this.move(over, placement);
  },
  isDragging: function() {
    return this.props.sortable.dragging == this.props.reactKey;
  }
};

module.exports = Sortable;
