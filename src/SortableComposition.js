import React from 'react';


/*** Helper functions - they are decoupled from component itself for testability */


/**
 * @param {array} items
 * @param {number} indexFrom
 * @param {number} indexTo
 * @returns {array}
 */
export function swapArrayElements(items, indexFrom, indexTo) {
  var item = items[indexTo];
  items[indexTo] = items[indexFrom];
  items[indexFrom] = item;
  return items;
}

/**
 * @param {number} mousePos
 * @param {number} elementPos
 * @param {number} elementSize
 * @returns {boolean}
 */
export function isMouseBeyond(mousePos, elementPos, elementSize) { //TODO refactor for UP
  var breakPoint = elementSize / 2; //break point is set to the middle line of element
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}


/*** Higher-order component - this component works like a factory for draggable items */

export function SortableComposition(Component) {

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      updateState: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    componentWillReceiveProps(nextProps) {
      this.setState({
        draggingIndex: nextProps.draggingIndex
      });
    },

    sortEnd() {
      this.props.updateState({
        draggingIndex: null
      });
    },

    sortStart(e) {
      const draggingIndex = e.currentTarget.dataset.id;
      this.props.updateState({
        draggingIndex: draggingIndex
      });
      this.setState({
        draggingIndex: draggingIndex
      });
      //TODO: add support for touch, use condition for e.type
      //e.dataTransfer.effectAllowed = 'move';
      //e.dataTransfer.setData("text/html", null);
      if (e.dataTransfer !== undefined) {
      e.dataTransfer.setData('text', e.target);
    }
    },

    dragOver(e) {
      console.log('dragOver e.type', e.type)
      //console.log('dragOver e.touches', e.touches)
      //console.log('dragOver e.targetTouches', e.touches)
      //console.log('dragOver e.pageX', e.pageX)
      //console.log('dragOver e.clientX', e.clientX)
      e.preventDefault();
      var mouseBeyond;
      var items = this.props.items;
      var positionX, positionY;
      const overEl = e.currentTarget; //underlying element
      const indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements
      const indexFrom = Number(this.state.draggingIndex);
      
     
      if(e.type === "dragover"){
        positionX = e.clientX;
        positionY = e.clientY;
      }
      
      if(e.type === "touchmove"){
         positionX = e.touches[0].pageX;
         positionY = e.touches[0].pageY;
      }
      
      //console.log('positionX', positionX)
      //console.log('positionY', positionY)
      //console.log('boundingTopY', overEl.getBoundingClientRect().top)
      //console.log('boundingHeightY', overEl.getBoundingClientRect().height)
      
      
      if (this.props.outline === "list") {
          mouseBeyond = isMouseBeyond(positionY, overEl.getBoundingClientRect().top, overEl.getBoundingClientRect().height)
          console.log('mouseBeyond', mouseBeyond); 
      }
      if (this.props.outline === "column") {
          mouseBeyond = isMouseBeyond(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width)
      }
      if(indexDragged !== indexFrom && mouseBeyond){
        items = swapArrayElements(items, indexFrom, indexDragged);
        this.props.updateState({
          items: items, draggingIndex: indexDragged
        });
      }
    },

    isDragging() {
      return this.props.draggingIndex == this.props.sortId;
    },

    render() {
      var draggingClassName = Component.displayName + "-dragging"
      return (
          <div className={this.isDragging() ? draggingClassName : ""}>
            <Component {...this.props}
                draggable={true}
                onDragOver={this.dragOver}
                onDragStart={this.sortStart}
                onDragEnd={this.sortEnd}
                isDragging={this.isDragging}
                onTouchStart={this.sortStart}
                onTouchMove={this.dragOver}
                onTouchEnd={this.sortEnd}
                data-id={this.props.sortId}/>
          </div>
      )
    }

  })
}

