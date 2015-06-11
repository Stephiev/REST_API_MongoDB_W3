"use strict";

var React   = require("react");
var CatList = require("./components/cats_list.jsx");

var App = React.createClass({
  render: function() {
    return (
      <main>
        <h1>{this.props.title}</h1>
        <CatList data={[{name: "Some Name"}]} />
      </main>
      )
  }
});

react.render(<App title="Cats and stuff" />, document.body);
// require("angular/angular");

// // Our list of dependencies (in the square brackets)
// // in the form of dependency injections
// var catsApp = angular.module("catsApp", []);

// // $scope is a JS object we can access form our view
// // and in our controller
// // This is how we get data from our model into our view
// // $scope should only be used in directives and controllers

// require("./cats/controllers/cats_controller")(catsApp);

// // Changes in the view affect the scope in the controller
// // that corresponds to that view. When we update one we
// // update the other.
