"use strict";

require("angular/angular");

// Our list of dependencies (in the square brackets)
// in the form of dependency injections
var catsApp = angular.module("catsApp", []);

// $scope is a JS object we can access form our view
// and in our controller
// This is how we get data from our model into our view
// $scope should only be used in directives and controllers


// services
require('./services/copy')(catsApp);
require("./services/rest_resource")(catsApp);


// controllers
require("./cats/controllers/cats_controller")(catsApp);

// directives

// Changes in the view affect the scope in the controller
// that corresponds to that view. When we update one we
// update the other.
