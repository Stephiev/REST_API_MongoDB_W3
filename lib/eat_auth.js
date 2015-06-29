// Auth middleware
// Need to be logged in to  get to certain areas and modify certain data.

"use strict";

var eat    = require("eat");
var User   = require("../models/User");
var colors = require("colors");

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.token || req.body.token;
    if (!token) {
      console.log("unauthorized: no token in request");
      return res.status(401).json({ msg: "not authorized" });
    }

    eat.decode(token, secret, function(err, decoded) {

      if (err) {
        console.log(err);
        return res.status(401).json({ msg: "not authorized" });
      }
      var tokenCreated     = decoded.timeStamp / 60000; // in minutes
      var currentTime      = Date.now() / 60000;
      var expiresAfterMins = 30;

      if (currentTime - tokenCreated > expiresAfterMins) {   // checks for expired token
        console.log("unauthorized: expired token");
        return res.status(401).json({ msg: "not authorized" });
      }

      User.findOne({ _id: decoded.id }, function(err, user) {
        if (err) {
          console.log(err);
          res.status(401).json({ msg: "not authorized" });
        }

        if (!user) {
          console.log("no user found for that token");
          return res.status(401).json({ msg: "not authorized" });
        }

        req.user = user;
        next();
      });
    });
  };
};
