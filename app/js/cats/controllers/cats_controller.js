"use strict";

module.exports = function(app) {
  app.controller("catsController", [ "$scope", "copy", "RESTresource", function($scope, copy, resource) {
    var Cat = resource("cats"); // this is where resourceName gets passed into our fxn
    $scope.errors = [];
    $scope.cats = [];
    $scope.getAll = function() {
        Cat.getAll(function(err, data) {
          if (err) {
            return $scope.errors.push({ msg: "error retrieving cats" }); // use return to exit fxn early
          }
          $scope.cats = data;
        })
    };

    // Make run in an async fashion, see cat before stored in db
    $scope.createNewCat = function() {
      var newCat = $scope.newCat; // transfer data from our directive scope to controller scope
      $scope.newCat = null;
      $scope.cats.push(newCat);
      Cat.create(newCat, function(err, data) {
        if (err) {
         return $scope.errors.push({ msg: "Error saving cat: " + newCat.name });
        }

        $scope.cats.splice($scope.cats.indexOf(newCat), 1, data);
      });
    };

    $scope.removeCat = function(cat) {
      $scope.cats.splice($scope.cats.indexOf(cat), 1);

      Cat.remove(cat, function(err, data) {
        if (err) {
          return $scope.errors.push({ msg: "could not remove cat \"" + cat.name + "\"" });
        }
      })
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
      Cat.save(cat, function(err, data) {
        if (err) {
          $scope.cats.splice($scope.cats.indexOf(cat), 1, cat.originalCat)
          return $scope.errors.push({ msg: "Could not save cat: " + cat.name });
        }
        cat.originalCat = {};
      });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  } ]);
};

// anything that starts with a dollar sign is an angular component
// function that takes an app that"s  called app.contoller
// you inject services into a controller
// $http is how we make requests
