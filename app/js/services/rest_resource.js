"use strict";

// 3 diff ways to create a service, most common is the factory
// method.
// all factories will return an object and the object will have a series
// of methods on it. $hhtp service looks like this
// unlike a controller you're always going to return
module.exports = function(app) {
  var handleError = function(callback) {
    return function(data) {
      console.log(data);
      callback(data);
    }
  };

  var handlSuccess = function(callback) {
    return function(data) {
      callback(null, data);
    }
  };

  app.factory("RESTresource", [ "$http", "$cookies", function($http, $cookies) { // can remove it from our controller now
    return function(resourceName) {  // return a function that returns a fxn
      var eat = $cookies.get("eat");
      $http.defaults.headers.common["token"] = eat; // from eat auth what was it sent as?
       return {
        getAll: function(callback) { // could also be called find
          $http.get("/api/" + resourceName)
            .success(handlSuccess(callback))
            .error(handleError(callback));
        },

        create: function(resourceData, callback) {
          $http.post("/api/" + resourceName, resourceData)
            .success(handlSuccess(callback))
            .error(handleError(callback)); // callback defined in controller
        },

      save: function(resourceData, callback) {
        $http.put("/api/" + resourceName + "/" + resourceData._id, resourceData)
          .success(handlSuccess(callback))
          .error(handleError(callback));
        },

      remove: function(resourceData, callback) {
        $http.delete("/api/" + resourceName + "/" + resourceData._id)
          .success(handlSuccess(callback))
          .error(handleError(callback));
      }

      // don't need to have .success and .error we're making this a node-style callbacks
     }
    };
  } ]);
};
