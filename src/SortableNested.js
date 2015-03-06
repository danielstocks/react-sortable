(function() {
  var SortableNested = {
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
    sortStart: function(e) {
      this.dragged = e.currentTarget.dataset.id;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },
    handleDrop: function(e) {
      e.preventDefault();
      this.props.sort(undefined, undefined);
    },
    dragEnd: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.props.sort(undefined, undefined);
    },
    move: function(over, placement) {
      var to = Number(over.dataset.id);
      var from = dragging || Number(this.dragged);
      this.props.sort(to, from, placement);
    },
    dragOver: function(e) {

      e.stopPropagation();
      e.preventDefault();
      var over = e.currentTarget
      var relY = e.clientY - over.getBoundingClientRect().top;
      var height = over.offsetHeight / 2;

      var relX = e.clientY - over.getBoundingClientRect().left;
      var width = over.offsetWidth / 2;

      var placement;
      if(relX > width) {
        placement = "append"
      }
      else if(relY > height) {
        placement = "after";
      }
      else if(relY < height) {
        placement = "before"
      }

      this.move(over, placement);
    },
    getClassName: function() {
      return this.props.data.id == dragging ? "dragging" : "";
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return SortableNested;
    });
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortableNested;
  }
  else {
    this.SortableNested = SortableNested;
  }

}.call(this));
