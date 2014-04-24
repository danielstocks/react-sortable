/** @jsx React.DOM */

var SortableList = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {
    this.dragged.classList.remove("dragging");
  },
  dragOver: function(e) {

    e.preventDefault();
    this.over = e.target;

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;

    if(relY > height) {
      this.nodePlacement = "after";
    }
    else if(relY < height) {
      this.nodePlacement = "before"
    }

    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);

    if(this.nodePlacement == "after") to++;
    if(from < to) to--;

    var data = this.state.data;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});
    this.dragged.classList.remove("dragging");
    this.dragged = e.currentTarget.children[to];
    this.dragged.classList.add("dragging");
  },
  render: function() {
    var listItems = this.state.data.map((function(item, i) {
      return (
        <li data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}>
          {item}
        </li>
      );
    }).bind(this));

    var gridItems = this.state.data.map((function(item, i) {
      return (
        <div data-id={i}
            key={i}
            style={{background: item}}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}>
          {item}
        </div>
      );
    }).bind(this));

    return (
      <div>
        <ul onDragOver={this.dragOver}>{listItems}</ul>
        <div id="grid">
          { gridItems }
        </div>
      </div>
    )
  }
});
