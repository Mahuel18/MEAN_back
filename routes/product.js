"use strict";

var express = require("express");
var productController = require("../controllers/productController");
var auth = require("../middlewares/authenticate");
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "../back/uploads/products/" });

var api = express.Router();

//PRODUCTS
api.post(
  "/add_product_admin",
  [auth.auth, path],
  productController.add_product_admin
);
api.get(
  "/list_product_admin/:filter?",
  auth.auth,
  productController.list_product_admin
);
api.get("/get_portada/:img", productController.get_portada);
api.get(
  "/get_product_admin/:id",
  auth.auth,
  productController.get_product_admin
);
api.put(
  "/update_product_admin/:id",
  [auth.auth, path],
  productController.update_product_admin
);
api.delete('/delete_product_admin/:id', auth.auth, productController.delete_product_admin);



//INVENTORY
api.get("/list_invetory_product_admin/:_id", auth.auth, productController.list_invetory_product_admin);
api.delete("/delete_inventory_product_admin/:id", auth.auth, productController.delete_inventory_product_admin);


module.exports = api;
