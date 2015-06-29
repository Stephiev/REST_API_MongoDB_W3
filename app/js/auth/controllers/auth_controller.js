"use strict";

module.exports = function(app) {
  app.controller("authController", [ "$scope", "$location", "auth", function($scope, $location, auth) {

    if (auth.isSignedIn()) {
      $location.path("/cats");
    }
    $scope.errors = [];

    $scope.authSubmit = function(user) {

      if (user.password_confirmation) { /*jscs:disable*/
        auth.create(user, function(err) {
          if (err) {
            console.log(err);
            $scope.errors.push({ msg: "Could not sign in"})
          }

          return $location.path("/cats");
        })
      } else {
        auth.signIn(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({ msg: "Could not create user" });
          }

          $location.path("/cats");
        })
      }
    }
  } ])
}
