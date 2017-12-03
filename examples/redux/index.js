import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import SortableList from './SortableList';

let initialState = {
  items: [
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
}

const sortableStore = (state = initialState, action) => {
  switch (action.type) {
    case 'SORT_ITEMS':
      return Object.assign({}, state, {
        items: action.items
      })
    default:
      return state
  }
}


let store = createStore(sortableStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const sortItems = items => {
  return {
    type: 'SORT_ITEMS',
    items
  }
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <SortableList
        items={store.getState().items}
        onSortItems={(items) => {
          store.dispatch(sortItems(items))
        }} />
    </Provider>,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
