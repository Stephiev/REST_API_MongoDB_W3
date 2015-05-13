"use strict";

var express = require("express");
var app = express();
var catsRouter = express.Router();

require("./routes/cats_routes")(catsRouter);

app.use("/api", catsRouter);
app.listen(3000, function() {
  console.log("Server running.");
});
