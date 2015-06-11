"use strict";

var React =  require("react");

// cat component
module.exports = React.createClass({
  redner: function() {
    return <li>{this.props.data.name}</li>
  }
})
