import React from 'react';

var StateView = React.createClass({
  render: function() {
    return (
        <div>
          <pre>{JSON.stringify(this.props.items, 0, 2)}</pre>
          <pre>{JSON.stringify(this.props.dragging, 0, 2)}</pre>
        </div>
    )
  }
})

export default StateView;