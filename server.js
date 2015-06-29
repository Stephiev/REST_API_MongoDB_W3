"use strict";

var mongoose   = require("mongoose");
var express    = require("express");
var passport   = require('passport');
var app        = express();

app.use(express.static(__dirname + "/build")); // Files inside /build are
// going to be statically served up from our app using this express.static

process.env.APP_SECRET = process.env.APP_SECRET || "Changethisnowwww!!!";

var catsRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/cats_development");

app.use(passport.initialize());

require("./lib/passport_strat")(passport);

require("./routes/cats_routes")(catsRoutes);
require("./routes/auth_routes")(usersRoutes);

app.use("/api", catsRoutes);
app.use("/api", usersRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port " + (process.env.PORT || 3000));
});
