import React from 'react';
import ReactDOM from 'react-dom';
import SortableItem from './SortableItem';
import StateView from './StateView';

export default class SortableList extends React.Component {

  state = {
    items: this.props.items
  };

  onSortItems = (items) => {
    this.setState({
      items: items
    });
  }

  render() {
    const { items } = this.state;

    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}>{item}</SortableItem>
      );
    });

    return (
      <div id="app">
        <div className="list">{listItems}</div>
        <StateView items={this.state.items} />
      </div>
    )
  }
};
