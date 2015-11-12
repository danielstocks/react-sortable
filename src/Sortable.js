var Sortable = {
  getDefaultProps: function() {
    return {
      draggable : true,
      onDragEnd: this.dragEnd.bind(this),
      onDragOver: this.dragOver.bind(this),
      onDragStart: this.sortStart.bind(this)
    }
  },
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    el.dataset.id = this.props.sortId;
    el.setAttribute('draggable', 'true');
    el.setAttribute('data-id', this.props.sortId);
    el.ondragend = this.sortEnd;
    el.ondragover = this.dragOver;
    el.ondragstart = this.sortStart;
  },
  componentWillUnmount: function() {
    var el = ReactDOM.findDOMNode(this);
    el.removeAttribute('data-id');
    el.ondragend = null;
    el.ondragover = null;
    el.ondragstart = null;
  },
  update: function(to, from) {
    var data = this.props.data.items;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function() {
    this.props.sortEnd(this.props.data.items, undefined);
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset ?
      e.currentTarget.dataset.id :
      e.currentTarget.getAttribute('data-id');
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/html', null);
    } catch (ex) {
      e.dataTransfer.setData('text', '');
    }
  },
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);

    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    var over = e.currentTarget;
    var relX = e.clientX - over.getBoundingClientRect().left;
    var relY = e.clientY - over.getBoundingClientRect().top;
    var height = over.offsetHeight / 2;
    var placement = this.placement ? this.placement(relX, relY, over) : relY > height;
    this.move(over, placement);
  },
  isDragging: function() {
    return this.props.data.dragging == this.props.sortId;
  }
};

module.exports = Sortable;
