"use strict";

module.exports = function(app) {
  app.controller("catsController", ["$scope", "$http", function($scope, $http) {
    $scope.errors = [];
    $scope.cats = [];
    $scope.getAll = function() {
      $http.get("/api/notes") // returns a promises with 2 different pieces. a .success and .error
        .success(function(data) {
          $scope.cats = data; // coming from our DB in our REST api is an array of cats. setting that array to scope.cats
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: "error retrieving notes"});
        })
    }
  } ]);

};

// anything that starts with a dollar sign is an angular component
// function that takes an app that's  called app.contoller
// you inject services into a controller
// $http is how we make requests
