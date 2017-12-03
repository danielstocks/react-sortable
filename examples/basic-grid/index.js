import React from 'react'
import ReactDOM from 'react-dom'

import SortableList from './SortableList'

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
  <SortableList items={items} />,
  document.getElementById('app')
)
