import React from 'react';
import { SortableNestedComposition } from '../../src/SortableNestedComposition';

var SortableNestedItem = SortableNestedComposition(React.createClass({

  render: function() {

    if(this.props.data.children) {
      var listItems = this.props.data.children.map(function(item) {
        return (
          <SortableNestedItem
            sort={this.props.sort}
            data={item}
            key={item.id}
          />
        );
      }, this);
    }

    return (
      <li {...this.props} className={this.getClassName()} >
        {this.props.data.module}
        <ul>{ listItems } </ul>
      </li>
    )
  }
})
)

export default SortableNestedItem;