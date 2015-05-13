"use strict";

var Cat = require("../models/Cat");
var bodyparser = require("body-parser");

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get("/cats", function(req, res) {
    Cat.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error." });
      }

      res.json(data);
    });
  });

  router.post("/cats", function(req, res) {
    var newCat = new Cat(req.body);
    newCat.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error." });
      }

      res.json(data);
    });
  });

  router.put("/cats/:id", function(req, res) {
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

  router.delete("/cats/:id", function(req, res) {
    Cat.remove({ "_id": req.params.id }, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
      }

      res.json({ msg: "success" });
    });
  });
};
