import React from 'react';


//helper functions are decoupled from component for testability

export function swapArrayElements(items, indexFrom, indexTo) {
  var item = items[indexTo];
  items[indexTo] = items[indexFrom];
  items[indexFrom] = item;
  return items;
}

export function isMouseBeyond(mousePos, elementPos, elementSize) {
  var breakPoint = elementSize / 2; //break point is set to the middle line of element
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}


export function SortableComposition(Component) {

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      updateState: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        draggingIndex: nextProps.draggingIndex
      });
    },

    sortEnd: function() {
      this.props.updateState({
        draggingIndex: null
      });
    },

    sortStart: function(e) {
      const draggingIndex = e.currentTarget.dataset.id;
      this.props.updateState({
        draggingIndex: draggingIndex
      });
      this.setState({
        draggingIndex: draggingIndex
      });
      //TODO: add support for touch, use condition for e.type
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("text/html", null);
    },

    dragOver: function(e) {
      e.preventDefault();
      var mouseBeyond;
      var items = this.props.items;
      const overEl = e.currentTarget; //underlying element
      const indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
      const indexFrom = Number(this.state.draggingIndex);
      if (this.props.outline === "list") {
          mouseBeyond = isMouseBeyond(e.clientY, overEl.getBoundingClientRect().top, overEl.getBoundingClientRect().height)
      }
      if (this.props.outline === "column") {
          mouseBeyond = isMouseBeyond(e.clientX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width)
      }
      if(indexDragged > indexFrom && mouseBeyond){
        items = swapArrayElements(items, indexFrom, indexDragged);
        this.props.updateState({
          items: items, draggingIndex: indexDragged
        });
      }
    },

    isDragging: function() {
      return this.props.draggingIndex == this.props.sortId;
    },

    render: function() {
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

