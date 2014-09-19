(function() {
  var Sortable = {
    getDefaultProps: function() {
      return {
        draggable : true
      }
    },
    componentDidMount: function() {
      var el = this.getDOMNode();
      el.setAttribute('data-id', this.props.key);
      el.ondragend = this.sortEnd;
      el.ondragover = this.dragOver;
      el.ondragstart = this.sortStart;
    },
    componentWillUnmount: function() {
      var el = this.getDOMNode();
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
      this.props.sort(this.props.data.items, undefined);
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
      var over = e.currentTarget
      var relX = e.clientX - over.getBoundingClientRect().left;
      var relY = e.clientY - over.getBoundingClientRect().top;
      var height = over.offsetHeight / 2;
      var placement = this.placement ? this.placement(relX, relY, over) : relY > height
      this.move(over, placement);
    },
    isDragging: function() {
      return this.props.data.dragging == this.props.key
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Sortable;
    });
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sortable;
  }
  else {
    this.Sortable = Sortable;
  }

}.call(this));
