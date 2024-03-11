"use strict";

const CLIENT = require("../models/client");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../helpers/jwt");

const add_client = async function (req, res) {
  //
  var data = req.body;
  var client_arr = [];

  client_arr = await CLIENT.find({ email: data.email });

  if (client_arr.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          var reg = await CLIENT.create(data);
          res.status(200).send({ data: reg });
        } else {
          res
            .status(200)
            .send({ message: "There is no password", data: undefined });
        }
      });
    } else {
      res
        .status(200)
        .send({ message: "There is no password", data: undefined });
    }
  } else {
    res.status(200).send({
      message: "The email is already in the database",
      data: undefined,
    });
  }
};

const login_client = async function (req, res) {
  var data = req.body;
  var client_arr = [];

  client_arr = await CLIENT.find({ email: data.email });

  if (client_arr.length == 0) {
    res.status(200).send({ message: "email not found", data: undefined });
  } else {
    //LOGIN
    let user = client_arr[0];
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: "password doesn't match", data: undefined });
      }
    });
  }
};

const list_client_admin_filter = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let tipo = req.params["tipo"];
      let filtro = req.params["filtro"];

      if (tipo == null || tipo == "null") {
        let reg = await CLIENT.find();
        res.status(200).send({ data: reg });
      } else {
        if (tipo == "lastname") {
          let reg = await CLIENT.find({ lastname: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        } else if (tipo == "email") {
          let reg = await CLIENT.find({ email: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        }
      }
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const register_client_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var data = req.body;

      bcrypt.hash("123456789", null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          let reg = await CLIENT.create(data);
          res.status(200).send({ data: reg });
        } else {
          res
            .status(200)
            .send({ message: "NO PASSWORD ADDED", data: undefined });
        }
      });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const get_client_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      try {
        var reg = await CLIENT.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const update_client_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      var data = req.body;

      var reg = await CLIENT.findByIdAndUpdate(
        { _id: id },
        {
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          dni: data.dni,
          genre: data.genre,
        }
      );

      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const delete_client_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      let reg = await CLIENT.findByIdAndDelete({ _id: id });

      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

module.exports = {
  add_client,
  login_client,
  list_client_admin_filter,
  register_client_admin,
  get_client_admin,
  update_client_admin,
  delete_client_admin,
};
