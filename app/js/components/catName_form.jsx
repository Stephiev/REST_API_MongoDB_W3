'use strict';

var React = require('react');

module.exports = React.createClass({
  handleChange: function(event){
    this.setState({catName: event.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    React.findDOMNode(this.refs.newCatName).value = '';
    this.props.entered(this.state.catName);
  },
  getInitialState: function() {
    return {catName: ''};
  },
  render: function(){
    return (
      <form name='catForm' onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <input type='text' ref='newCatName' placeholder="Enter a name" />
        <input type='submit' value="Submit" />
      </form>
    );
  }
});
