import ReactDOM from 'react-dom';
import SortableList from './basic/SortableList';
var data = {
  items: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue"
  ]
};

ReactDOM.render(
  <SortableList data={data} />,
  document.getElementById('app')
);
