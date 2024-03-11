"use strict";

let express = require("express");
let clientController = require("../controllers/ClientController");
let auth = require("../middlewares/authenticate");

let api = express.Router();

//POST
api.post("/add_client", clientController.add_client);
api.post("/login_client", clientController.login_client);
api.post(
  "/register_client_admin",
  auth.auth,
  clientController.register_client_admin
);

//GET
api.get(
  "/list_client_admin_filter/:tipo/:filtro?",
  auth.auth,
  clientController.list_client_admin_filter
);
api.get("/get_client_admin/:id", auth.auth, clientController.get_client_admin);

//PUT
api.put(
  "/update_client_admin/:id",
  auth.auth,
  clientController.update_client_admin
);

//DELETE
api.delete(
  "/delete_client_admin/:id",
  auth.auth,
  clientController.delete_client_admin
);

module.exports = api;
