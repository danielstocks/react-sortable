import React from 'react';
import ReactDOM from 'react-dom';
import SortableListItem from './SortableListItem';
import SortableGridItem from './SortableGridItem';
import StateView from './StateView';

export default class SortableList extends React.Component {

  state = {
    draggingIndex: null,
    data: this.props.data
  };

  updateState = (obj) => {
    this.setState(obj);
  }

  render() {
    const {draggingIndex, data:{items: items}} = this.state;
    var listItems = items.map(function(item, i) {
      return (
          <SortableListItem
              key={i}
              updateState={this.updateState}
              items={items}
              draggingIndex={draggingIndex}
              sortId={i}
              outline="list">{item}</SortableListItem>
      );
    }, this);

    var gridItems = items.map(function(item, i) {
      return (
          <SortableGridItem key={i}
                            updateState={this.updateState}
                            items={items}
                            draggingIndex={draggingIndex}
                            sortId={i}
                            outline="grid">{item}</SortableGridItem>
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
};
