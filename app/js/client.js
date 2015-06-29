"use strict";

require("angular/angular");
require("angular-route");
require("angular-cookies");
require("angular-base64");

// Our list of dependencies (in the square brackets)
// in the form of dependency injections
var catsApp = angular.module("catsApp", [ "ngRoute", "ngCookies", "base64" ]);

// $scope is a JS object we can access form our view
// and in our controller
// This is how we get data from our model into our view
// $scope should only be used in directives and controllers

// services
require("./services/copy")(catsApp);
require("./services/rest_resource")(catsApp);
require("./auth/services/auth")(catsApp);

// controllers
require("./cats/controllers/cats_controller")(catsApp);
require("./auth/controllers/auth_controller")(catsApp);

// directives
require("./directives/title_directive")(catsApp);
require("./cats/directives/cat_form_directive")(catsApp);
require("./auth/directives/logout_directive")(catsApp);

// Some routing
catsApp.config([ "$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/cats", {
      templateUrl: "./templates/views/cats_view.html",
      controller: "catsController"
    })
    .when("/sign_in", {
      templateUrl: "templates/views/sign_in.html",
      controller: "authController"
    })
    .when("/create_user", {
      templateUrl: "templates/views/create_user.html",
      controller: "authController"
    })
    .when("/", {
      redirectTo: "/cats"
     })
    .otherwise({
      redirectTo: "/create_user"
    });
} ]);

// Changes in the view affect the scope in the controller
// that corresponds to that view. When we update one we
// update the other.
