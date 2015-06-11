"use strict";

var mongoose   = require("mongoose");
var express    = require("express");
var app        = express();
var catsRoutes = express.Router();

mongoose.connect("mongodb://localhost/cats_development");

app.use(express.static(__dirname + "/build")); // Files inside /build are
// going to be statically served up from our app using this express.static

require("./routes/cats_routes")(catsRoutes);

app.use("/api", catsRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port " + (process.env.PORT || 3000));
});
