import React from 'react';
import ReactDOM from 'react-dom';
import SortableListItem from './SortableListItem';
import SortableGridItem from './SortableGridItem';
import StateView from '../StateView';

var App = React.createClass({

  getInitialState: function() {
    return {
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
      ],
      draggingIndex: null
    };
  },

  setItems: function(items) {
    this.setState({
      items: items
    });
  },

  setDraggingIndex: function(index) {
    this.setState({
      draggingIndex: index
    });
  },


  render: function() {

    var listItems = this.state.items.map(function(item, i) {
      return (
          <SortableListItem
              key={i}
              setItems={this.setItems}
              setDraggingIndex={this.setDraggingIndex}
              items={this.state.items}
              draggingIndex={this.state.draggingIndex}
              sortId={i}
              outline="list"
              item={item}/>
      );
    }, this);

    var gridItems = this.state.items.map(function(item, i) {
      return (
          <SortableGridItem key={i}
                            setItems={this.setItems}
                            setDraggingIndex={this.setDraggingIndex}
                            items={this.state.items}
                            draggingIndex={this.state.draggingIndex}
                            sortId={i}
                            item={item}
                            outline="column"
                            style={{background: item}}/>
      );
    }, this);

    return (
        <div id="app">
          <div className="list">{listItems}</div>
          <div className="grid">{gridItems}</div>
          <StateView items={this.state.items} dragging={this.state.draggingIndex}/>
        </div>
    )
  }
});


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);