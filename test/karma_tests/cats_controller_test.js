"use strict";

require("../../app/js/client");
require("angular-mocks");

describe("cats controller",  function() {
  var $ControllerConstructor;
  var $httpBackend;  // we get an interface and a series of promises from http
  var $scope;

  beforeEach(angular.mock.module("catsApp"));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  })); // not using brackets cause not going to minify it

  it("should be able to create a new controller", function() {
    var catsController = $ControllerConstructor("catsController", {$scope: $scope});
    expect(typeof catsController).toBe("object");
    expect(Array.isArray($scope.cats)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe("function");
  });

  describe("REST functionality", function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.catsController = $ControllerConstructor("catsController", {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should make a get request on index", function() {
      $httpBackend.expectGET("/api/cats").respond(200, [{_id: "1", name: "test cat name"}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cats[0].name).toBe("test cat name");
      expect($scope.cats[0]._id).toBe("1");
    });

    it("should correctly handle errors", function() {
      $httpBackend.expectGET("/api/cats").respond(500, {msg: "server error"});

      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe("error retrieving cats");
    });

    it("should be able to save a cat", function() {
      $scope.newCat = {name: "test cat"};
      $httpBackend.expectPOST("/api/cats").respond(200, {_id: "2", name: "test cat"});
      $scope.createNewCat();
      $httpBackend.flush();
      expect($scope.cats[0].name).toBe("test cat");
      expect($scope.cats[0]._id).toBe("2");
      expect($scope.newCat).toBe(null);
    });

    it("should delete a cat", function() {
      var cat = {_id: "3", name: "test cat"};
      $scope.cats.push(cat);
      $httpBackend.expectDELETE("/api/cats/3").respond(200, {msg: "success"});
      expect($scope.cats.indexOf(cat)).not.toBe(-1);
      $scope.removeCat(cat);
      expect($scope.cats.indexOf(cat)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it("should delete a cat even with server error", function() {
      var cat = {_id: "4", name: "test cat"};
      $scope.cats.push(cat);
      $httpBackend.expectDELETE("/api/cats/4").respond(500, {msg: "uhh ohhh"});
      expect($scope.cats.indexOf(cat)).not.toBe(-1);
      $scope.removeCat(cat);
      expect($scope.cats.indexOf(cat)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe("could not remove cat \"test cat\"");
    });

    it('should be able to edit a cat', function() {
      var cat = {_id: 5, name: "test cat"};
      $scope.cats.push(cat);
      $scope.catEdit(cat);
      cat.name = 'updated cat';
      $httpBackend.expectPUT('/api/cats/' + cat._id, cat ).respond(200, [ cat ]);
      $scope.saveEdit(cat);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
      expect($scope.cats[0].name).toBe('updated cat');
    });
  });
});
