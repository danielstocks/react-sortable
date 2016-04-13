import React from 'react';

var SortableComposition = function(Component) {

  return React.createClass({

    proptypes:{
      items: React.PropTypes.array.isRequired,
      sort: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number
      //TODO add 'dragging', but it shouldn't be undefined
    },

    //move field in array
    update: function(to, from) { //TODO: try to use lodash
      var data = this.props.items;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.props.sort(data, to);
    },
    sortEnd: function() {
      this.props.sort(this.props.items, undefined);
    },
    //move field in array
    sortStart: function(e) {
      this.dragged = e.currentTarget.dataset ? e.currentTarget.dataset.id : e.currentTarget.getAttribute('data-id');
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
      var overEl = e.currentTarget;
      // mouse vertical coordinate
      var relY = e.clientY - overEl.getBoundingClientRect().top;
      // mouse horizontal coordinate
      var relX = e.clientX - overEl.getBoundingClientRect().left;
      //TODO: height is not used in grid demo, can be refactored
      var height = overEl.offsetHeight / 2;
      //TODO: this.placement is always undefined in list demo, create more readable condition
      var placement = this.placement ? this.placement(relX, relY, over) : relY > height
      this.move(overEl, placement);
    },
    isDragging: function() {
      return this.props.dragging == this.props.sortId;
    },
    render: function() {
      console.log('SortableComposition this.props', this.props)
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
