/** @jsx React.DOM */

var App = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  move: function(to, from) {
    var data = this.state.data;
    data.forEach(function(obj) {
      obj.flying = false;
    });
    data[from].flying = true;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.setState({data: data});
  },
  sortEnd: function() {
    this.setState({data: this.state.data.map(function(obj) {
      obj.flying = false;
      return obj;
    })});
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
  },
  over: function(over,append) {
    var from = Number(this.dragged);
    var to = Number(over.dataset.id);
    if(append) to++;
    if(from < to) to--;
    this.move(to,from);
    this.dragged = to;
  },
  render: function() {

    return (
      <div id="app">
        <SortableList over={this.over}
                      sortEnd={this.sortEnd}
                      sortStart={this.sortStart}
                      data={this.state.data}/>

        <SortableGrid over={this.over}
                      sortEnd={this.sortEnd}
                      sortStart={this.sortStart}
                      data={this.state.data}/>
      </div>
    )
  }
});
