/** @jsx React.DOM */

var SortableNestedItem = React.createClass({

  mixins: [SortableNested],

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

    return this.transferPropsTo(
      <li style={this.props.style} className={this.getClassName()} >
        {this.props.data.module}
        <ul>{ listItems } </ul>
      </li>
    )
  }
})
