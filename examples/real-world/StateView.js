import React from 'react';

export default class StateView extends React.Component {
  render() {
    return (
        <div>
          <pre>{JSON.stringify(this.props.items, 0, 2)}</pre>
          <pre>{JSON.stringify(this.props.dragging, 0, 2)}</pre>
        </div>
    )
  }
}
