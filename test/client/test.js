'use strict';

var expect = require('chai').expect;
var greet  = require('../../app/js/greet');

describe('greet', function() {
  it('should greet the world', function() {
    expect(greet()).to.eq('Hello world, from the wonderful land of fur!');
  });
});
