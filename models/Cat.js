// Must explicitly create a table and what it's
// going to look like before you can start using it
"use strict";

var Sql = require("sequelize");
var sql = new Sql("cat_dev", "cat_dev", "foobar123", {
  dialect: "postgres"
});

// Similar to mongoose.model but just a hash
// of key/values equal to sql.the constant
var Cat = module.exports = sql.define("Cat", {
  name: Sql.STRING,
  type: Sql.STRING
});

// Sync up this table with our postgres DB
Cat.sync();
