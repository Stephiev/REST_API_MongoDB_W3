"use strict";

var bodyparser = require("body-parser");
var Cat = require("../models/Cat.js");
var Sql = require("sequelize");
var sql = new Sql("cat_dev", "cat_dev", "foobar123", {
  dialect: "postgres"
});

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post("/cats", function(req, res) {
    sql.sync()
    .then(function() {
      Cat.create(req.body)
      .then(function(data) {  // Promise style, .then can be thought of as a success
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
    });
  });

  router.get("/cats", function(req, res) {
    sql.sync()
    .then(function() {
      Cat.all()
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
    });
  });

  router.delete("/cats/:id", function(req, res) {
    sql.sync()
    .then(function() {
      Cat.destroy({ where: { id: req.params.id } })
      .then(function(data) {
        res.json({ msg: "success" });
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
    });
  });

  router.put("/cats/:id", function(req, res) {
    sql.sync()
    .then(function() {
      Cat.update(req.body, { where: { id: req.params.id } })
      .then(function(data) {
        if (data[0] > 0) {
          res.json({ msg: "success" });
        } else {
          res.json({ msg: "That id does not exist" });
        }
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
    });
  });
};
