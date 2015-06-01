"use strict";

var expect = require("chai").expect;
var hello = require("../../app/js/hello");

describe("hello module", function() {
  it('should greet the user', function() {
    expect(greet()).to.eql("Hello! It\'s time for kittens, kittens, and more kittens.");
  });
});
