/** @jsx React.DOM */

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var SortableList = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(this.nodePlacement == "after") to++;
    this.update(from, to);
  },
  dragOver: function(e) {

    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;

    // For a nice sortable experience
    // we wan to be able to drop over
    // or under the target element based
    // on mouse position
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;

    if(relY > height) {
      this.nodePlacement = "after";
      e.target.parentNode.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  },
  update: function(from,to) {
    var data = this.state.data;
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});
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

    return <ul onDragOver={this.dragOver}>{listItems}</ul>
  }
});
