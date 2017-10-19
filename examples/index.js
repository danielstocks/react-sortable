import React from "react";
import ReactDOM from 'react-dom';

import SortableList from './real-world/SortableList';

var data = {
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
};

ReactDOM.render(
  <SortableList data={data} />,
  document.getElementById('app')
);
