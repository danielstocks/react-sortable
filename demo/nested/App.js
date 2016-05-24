import React from 'react';
import ReactDOM from 'react-dom';
import StateView from '../StateView';


import SortableNestedItem from './SortableNestedItem';


var dragging;

var fixture = {
  module: "root",
  children: [
    {
      "module":"section",
      "children":
        [
          {
             "module":"header",
          },
          {
             "module":"paragraph",
          },
          {
             "module":"image",
          },
          {
            "module":"section",
            "children":
              [
                {
                   "module":"header",
                },
                {
                   "module":"paragraph",
                },
                {
                   "module":"image",
                }
              ]
          },
        ]
    },
    {
      "module":"section",
      "children":[
        {
           "module":"column",
        },
        {
           "module":"video",
        }
      ]
    },
    {
      "module":"image"
    },
  ]
}



var App = React.createClass({
  getInitialState: function() {
    return {
      data: fixture,
      draggingIndex: null
    };
  },
  updateState: function(obj) {
    this.setState(obj);
  },
 
  render: function() {
    var listItems = this.state.data.children.map(function(item, i) {
      return (
        <SortableNestedItem sort={this.props.sort} data={item} key={item.id}/>
      );
    }, this);
    
    return (
      <div>
        <ul id="top">{listItems}</ul>
        <StateView data={this.state.data}/>
      </div>
    )
  }
});


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);