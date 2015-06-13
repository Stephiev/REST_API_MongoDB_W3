"use strict";

var React = require("react");
var Cat   = require("./DBcat.jsx");

module.exports = React.createClass({
  renderCats: function() {
    return this.props.data.map(function(cat) {
      return <Cat data={cat} key={cat._id} />
    })
  },
  render: function() {
    return (  // return a multiple line statement
      <ul>
        {this.renderCats()}
      </ul>
      )
  }
})
