"use strict";

var Basic = require("passport-http").BasicStrategy;
var User  = require("../models/User");

module.exports = function(passport) {
  passport.use("basic", new Basic({}, function(email, password, done) {
    User.findOne({ "basic.email": email }, function(err, user) { // pass as string if you want to do subobject in mongoose
      if (err) return done("database error");

      if (!user) return done("no such user");

      user.checkPassword(password, function(err, data) {
        if (err) {
          return done("There was some sort of error.");
        }

        if (!data) {
          return done("wrong password");
        }

        return done(null, user);
      });
    });
  }));
};

// 3 situations where we can fail on our authentication
// 1. Don't find the user in DB, 2. Password doesn't match
// 3. DB internal error

// Done callback is called same way as node callbacks are called each one populates the
// error message in callback that passport knows how to use
