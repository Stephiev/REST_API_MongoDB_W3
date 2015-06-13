"use strict";

var React =  require("react");

// cat component
module.exports = React.createClass({
  render: function() {
    return <li>{this.props.data.name}</li> // Why do I need this.props.data.name and not this.props.name?
  }
})
