import React from 'react';

var SortableComposition = function(Component) {

  return React.createClass({
    getDefaultProps: function() {
      return {
        draggable: true
      };
    },
    update: function(to, from) {
      var data = this.props.data.items;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.props.sort(data, to);
    },
    sortEnd: function() {
      this.props.sort(this.props.data.items, undefined);
    },
    sortStart: function(e) {
      this.dragged = e.currentTarget.dataset ? e.currentTarget.dataset.id : e.currentTarget.getAttribute('data-id');
      //console.log('e.type', e.type);
      //TODO: add support for touch, use condition for e.type
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },
    move: function(over, append) {
      var to = Number(over.dataset.id);
      var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);
      if (append) {
        to++;
      }
      if (from < to) {
        to--;
      }
      this.update(to, from);
    },
    dragOver: function(e) {
      e.preventDefault();
      var over = e.currentTarget;
      var relY = e.clientY - over.getBoundingClientRect().top;
      var relX = e.clientX - over.getBoundingClientRect().left;
      var height = over.offsetHeight / 2;
      var placement = this.placement ? this.placement(relX, relY, over) : relY > height;
      this.move(over, placement);
    },
    isDragging: function() {
      return this.props.data.dragging == this.props.sortId;
    },
    render: function() {
      //unused events: onDragLeave onDragExit onDragEnter
      return <Component {...this.props}
          draggable={true}
          onDragOver={this.dragOver}
          onDragStart={this.sortStart}
          onDragEnd={this.sortEnd}
          isDragging={this.isDragging}
          data-id={this.props.sortId}/>

    }
  })
}

export default SortableComposition;
