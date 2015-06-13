'use strict';

var React = require('react');
var CatName = require('./catName.jsx')

module.exports = React.createClass({
  addCatNames: function(){
      return this.props.data.map(function(name){
        return <CatName data={name} key={name + 1}/> // Cannot enter the same name with the ID like this
      });
  },
  render: function(){
    return(
      <ul>
        {this.addCatNames()}
      </ul>
    );
  }
});
