import React from 'react'
import ReactDOM from 'react-dom'

import SortableList from './basic-list/SortableList'
import SortableGrid from './basic-grid/SortableGrid'

var items = [
  "Gold",
  "Crimson",
  "Hotpink",
  "Blueviolet",
  "Cornflowerblue",
  "Skyblue",
  "Lightblue",
  "Aquamarine",
  "Burlywood"
]

ReactDOM.render(
  <div>
    <SortableList items={items} />
    <SortableGrid items={items} />
  </div>,
  document.getElementById('app')
)
