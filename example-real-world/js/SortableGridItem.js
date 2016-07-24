import React from 'react';
//import { Sortable } from 'react-sortable';
import { SortableComposition as Sortable }  from '../../src/SortableComposition';

var GridItem = React.createClass({
  displayName: 'SortableGridItem',
  proptypes:{
    item: React.PropTypes.string.isRequired,
  },
  render: function() {
    return (
          <div {...this.props} className="grid-item" style={{background: this.props.children}}>
            <span>{this.props.children}</span>
          </div>
        )
  }
})

export default Sortable(GridItem);
