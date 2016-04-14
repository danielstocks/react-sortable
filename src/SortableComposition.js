import React from 'react';

var SortableComposition = function(Component) {

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      sort: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    //move field in array
    update: function(to, from) { //TODO: try to use lodash
      var data = this.props.items;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.props.sort(data, to);

    },
    sortEnd: function() {
      this.props.setDraggingIndex(null);
    },

    sortStart: function(e) {
      //this.dragged = e.currentTarget.dataset ? e.currentTarget.dataset.id : e.currentTarget.getAttribute('data-id'); TODO: drop this line after compatibility check
      this.dragged = e.currentTarget.dataset.id;
      this.props.setDraggingIndex(this.dragged)
      //console.log('sortStart e.currentTarget.dataset', e.currentTarget.dataset)
      //TODO: add support for touch, use condition for e.type
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },
    //move field in array
    move: function(over, append) { //TODO: try to use lodash
      var to = Number(over.dataset.id);
      var from = this.props.dragging != undefined ? this.props.dragging : Number(this.dragged);
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
      var placement;
      var overEl = e.currentTarget; // fixed element over which is the moving element being dragged

      if (this.props.outline === "list") {
        // mouse vertical coordinate
        var relY = e.clientY - overEl.getBoundingClientRect().top;
        var height = overEl.offsetHeight / 2;
        placement = relY > height;
      }

      if (this.props.outline === "column") {
        // mouse horizontal coordinate
        var relX = e.clientX - overEl.getBoundingClientRect().left;
        var width = overEl.offsetWidth / 2;
        placement = relX > width;
      }
      console.log('placement', placement)

      this.move(overEl, placement);
    },
    isDragging: function() {
      return this.props.draggingIndex == this.props.sortId;
    },
    render: function() {
      //console.log('SortableComposition this.props', this.props)
      //unused events: onDragLeave onDragExit onDragEnter
      var draggingClassName = Component.displayName + "-dragging"
      return (
          <div className={this.isDragging() ? draggingClassName : ""}>
            <Component {...this.props}
                draggable={true}
                onDragOver={this.dragOver}
                onDragStart={this.sortStart}
                onDragEnd={this.sortEnd}
                isDragging={this.isDragging}
                data-id={this.props.sortId}/>
          </div>
      )

    }
  })
}

export default SortableComposition;
