import React from 'react'
import PropTypes from 'prop-types'
import { swapArrayElements, isMouseBeyond } from './helpers.js'

export const VERTICAL = 'VERTICAL'
export const HORIZONTAL = 'HORIZONTAL'


/*** Higher-order component - this component works like a factory for draggable items */

let draggingIndex = null

export function SortableComposition(Component, flowDirection = VERTICAL) {

  return class Sortable extends React.Component {

    sortEnd = (e) => {
      e.preventDefault()
      draggingIndex = null
    }

    sortStart = (e) => {
      draggingIndex = e.currentTarget.dataset.id
      let dt = e.dataTransfer
      if (dt !== undefined) {
        e.dataTransfer.setData('text', e.target.innerHTML)

        //fix http://stackoverflow.com/questions/27656183/preserve-appearance-of-dragged-a-element-when-using-html5-draggable-attribute
        if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
          dt.setDragImage(e.target, 0, 0)
        }
      }
    }

    dragOver = (e) => {
      e.preventDefault();
      const { moveInMiddle, sortId } = this.props
      const overEl = e.currentTarget //underlying element
      const indexDragged = Number(overEl.dataset.id) //index of underlying element in the set DOM elements
      const indexFrom = Number(draggingIndex)
      const height = overEl.getBoundingClientRect().height
      const width = overEl.getBoundingClientRect().width
      const positionX = e.clientX
      const positionY = e.clientY
      const topOffset = overEl.getBoundingClientRect().top
      const leftOffset = overEl.getBoundingClientRect().left
      let mouseBeyond
      let { items } = this.props


      if (flowDirection === VERTICAL) {
        mouseBeyond = isMouseBeyond(positionY, topOffset, height, moveInMiddle)
      }

      if (flowDirection === HORIZONTAL) {
        mouseBeyond = isMouseBeyond(positionX, leftOffset, width, moveInMiddle)
      }

      let shouldSwapItems = isMouseBeyond && indexDragged !== indexFrom

      if (indexDragged !== indexFrom && mouseBeyond) {
        items = swapArrayElements(items, indexFrom, indexDragged)
        draggingIndex = indexDragged
        this.props.onSortItems(items)
      }

    }

    render() {
      let newProps = Object.assign({}, this.props)
      delete newProps.onSortItems
      const { sortId, ...props } = newProps
      return (
        <Component
          draggable={true}
          onDragOver={this.dragOver}
          onDragStart={this.sortStart}
          onDragEnd={this.sortEnd}
          onTouchStart={this.sortStart}
          onTouchMove={this.dragOver}
          onTouchEnd={this.sortEnd}
          data-id={sortId}
          {...props}
        />
      )
    }

  }

  Sortable.propTypes = {
    items: PropTypes.array.isRequired,
    onSortItems: PropTypes.func.isRequired,
    sortId: PropTypes.number,
  };

  Sortable.defaultProps = {
    moveInMiddle: false
  };

  return Sortable

}
