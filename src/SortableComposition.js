import React from 'react';

var SortableComposition = function(Component) {

  return React.createClass({
    //move field in array
    update: function(to, from) {
      var data = this.props.data.items;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.props.sort(data, to);
    },
    sortEnd: function() {
      this.props.sort(this.props.data.items, undefined);
    },
    //move field in array
    sortStart: function(e) {
      this.dragged = e.currentTarget.dataset ? e.currentTarget.dataset.id : e.currentTarget.getAttribute('data-id');
      //console.log('this.dragged', this.dragged)
      //console.log('e.type', e.type);
      //TODO: add support for touch, use condition for e.type
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },
    //move field in array
    move: function(over, append) {
      var to = Number(over.dataset.id);
      //console.log(this.props.data.dragging);
      var from = this.props.data.dragging != undefined ? this.props.data.dragging : Number(this.dragged);
      if (append) {
        to++;
      }

      if (from < to) {
        to--;
      }
      this.update(to, from);
    },
    //move field in array
    dragOver: function(e) {
      e.preventDefault();
      var overEl = e.currentTarget;
      // mouse vertical coordinate
      var relY = e.clientY - overEl.getBoundingClientRect().top;
      // mouse horizontal coordinate
      var relX = e.clientX - overEl.getBoundingClientRect().left;
      //console.log('dragOver relX', relX)
      var height = overEl.offsetHeight / 2;
      var placement = relY > height;
      this.move(overEl, placement);
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
