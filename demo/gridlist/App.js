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
      dragging: null
    };
  },

  sort: function(items, dragging) {
    this.setState({
      items: items,
      dragging: dragging
    });
  },

  render: function() {

    var listItems = this.state.items.map(function(item, i) {
      return (
          <SortableListItem
              key={i}
              sort={this.sort}
              items={this.state.items}
              dragging={this.state.dragging}
              sortId={i}
              item={item}/>
      );
    }, this);

    var gridItems = this.state.items.map(function(item, i) {
      return (
          <SortableGridItem key={i}
                            sort={this.sort}
                            items={this.state.items}
                            dragging={this.state.dragging}
                            sortId={i}
                            item={item}
                            style={{background: item}}/>
      );
    }, this);

    return (
        <div id="app">
          <div className="list">{listItems}</div>
          <div className="grid">{gridItems}</div>
          <StateView items={this.state.items} dragging={this.state.dragging}/>
        </div>
    )
  }
});


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);