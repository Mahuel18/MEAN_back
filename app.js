"use strict";

let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
let port = process.env.PORT || 4201;

var client_route = require("./routes/client");
var admin_route = require("./routes/admin");
var product_route = require("./routes/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() =>
    app.listen(port, function () {
      console.log("Servidor corriendo en el puerto " + port);
    })
  )
  .catch((error) => console.log(error));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", client_route);
app.use("/api/", admin_route);
app.use("/api/", product_route);

module.exports = app;
