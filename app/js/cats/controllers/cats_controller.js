"use strict";

module.exports = function(app) {
  app.controller("catsController", [ "$scope", "$http", function($scope, $http) {
    $scope.errors = [];
    $scope.cats = [];
    $scope.getAll = function() {
      $http.get("/api/cats") // returns a promises with 2 different pieces. a .success and .error
        .success(function(data) {
          $scope.cats = data; // coming from our DB in our REST api is an array of cats. setting that array to scope.cats
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({ msg: "error retrieving cats" });
        });
    };

    // Make run in an async fashion, see cat before stored in db
    $scope.createNewCat = function() {
      $scope.cats.push($scope.newCat); // Update the UI before receiving a response
      $http.post("/api/cats", $scope.newCat)
        .success(function(data) {
          $scope.newCat._id = data._id; // Place ID on newCat object so we can edit
          $scope.newCat = null;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({ msg: "could not create a new cat" });
        });
    };

    $scope.removeCat = function(cat) {
      $scope.cats.splice($scope.cats.indexOf(cat), 1);
      $http.delete("/api/cats/" + cat._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({ msg: "could not remove cat \"" + cat.name + "\"" });
          $scope.cats.push(cat);
      });
    };

    $scope.catEdit = function(cat) {
      cat.editing = true;
      cat.originalCat = cat.name;

    };

    $scope.cancelEdit = function(cat) {
      cat.name = cat.originalCat;
      cat.editing = false;
    };

    $scope.saveEdit = function(cat) {
      cat.editing = false;
      $http.put("/api/cats/" + cat._id, cat)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({ msg: "Error editing cat from " + cat.originalCat + " to " + cat.name });
          cat.name = cat.originalCat;
        });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
    };
  } ]);

};

// anything that starts with a dollar sign is an angular component
// function that takes an app that's  called app.contoller
// you inject services into a controller
// $http is how we make requests
