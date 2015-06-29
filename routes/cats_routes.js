"use strict";

var Cat        = require("../models/Cat");
var bodyparser = require("body-parser");
var eatAuth = require("../lib/eat_auth.js")(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get("/cats", eatAuth, function(req, res) {
    Cat.find({ authorId: req.user._id }, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error." });
      }

      res.json(data);
    });
  });

  router.post("/cats", eatAuth, function(req, res) {
    var newCat = new Cat(req.body);
    newCat.authorId = req.user._id;
    newCat.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error." });
      }

      setTimeout(function() {res.json(data); }, 500);
    });
  });

  router.patch("/cats/:id", eatAuth, function(req, res) {
    var updatedCat = req.body;
    delete updatedCat._id;

    Cat.update({ "_id": req.params.id }, updatedCat, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
      }

      res.json({ msg: "success" });
    });
  });

  router.delete("/cats/:id", eatAuth, function(req, res) {
    Cat.remove({ "_id": req.params.id }, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
      }

      res.json({ msg: "success" });
    });
  });
};
