"use strict";

var React = require("react");
var Cat   = require("./cat.jsx");

module.exports = React.createClass({
  renderCats: function() {
    return this.props.data.map(function() {
      return <Cat data=cat />
    })
  }
  render: function() {
    return (  // return a multiple line statement
      <ul>
        {this.renderCats()}
      </ul>
      )
  }
})
