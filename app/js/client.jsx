"use strict";

var React       = require('react');
var CatNameForm = require('./components/catName_form.jsx');
var CatNameList = require('./components/catName_list.jsx');
var CatList     = require("./components/DBcats_list.jsx");
var request     = require("superagent");

var DbCatsComponent = React.createClass({
  getInitialState: function() {
    return {cats: [], title: "Welcome to FurLand!"};
  },

  componentDidMount: function() {
    request
      .get("/api/cats")
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }
        this.setState({cats: res.body});
      }.bind(this)); // want to be able to get this.getState
  },

  render: function() {
    return (
      <main>
        <h1>{this.state.title}</h1>
        <h2>Here is a list of all the cats that live here</h2>
        <CatList data={this.state.cats} />
      </main>
      )
  }
});

React.render(<DbCatsComponent />, document.body.getElementsByTagName("main")[0])

var FormComponent = React.createClass({
  updateName: function(newCatName) {
    this.props.names.push(newCatName);
    this.setState({catName: newCatName});
  },
  getInitialState: function() {
    return {catName: ""};
  },
  render: function() {
    return(
      <main>
        <h1>What are some cat names you like?</h1>
        <CatNameForm entered={this.updateName}/>
        <h2>Here are the names you have entered:</h2>
        <CatNameList data={this.props.names}/>
        <p>Those are some nice names!</p>
      </main>
    );
  }
});

React.render(<FormComponent names={[]}/>, document.body.getElementsByTagName("div")[0]);
