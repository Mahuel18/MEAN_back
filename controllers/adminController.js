"use strict";

const ADMIN = require("../models/admin");
let bcrypt = require("bcrypt-nodejs");
let jwt = require('../helpers/jwt');

const add_admin = async function (req, res) {
  //
  let data = req.body;
  let admin_arr = [];

  admin_arr = await ADMIN.find({ email: data.email });

  if (admin_arr.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          let reg = await ADMIN.create(data);
          res.status(200).send({ data: reg });
        } else {
            res
        .status(200)
        .send({ message: "ErrorServer", data: undefined });
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
  }};

const login_admin = async function(req,res){
  let data = req.body;
  let admin_arr = [];

  admin_arr = await ADMIN.find({email: data.email});

  if(admin_arr.length == 0){
    res.status(200).send({message: 'email not found', data: undefined});
  } else {
    let user = admin_arr[0];
    bcrypt.compare(data.password, user.password, async function(error, check){
      if(check){
          res.status(200).send({data:user, token: jwt.createToken(user)});
        } else {
          res.status(200).send({message: 'password doesn\'t match', data: undefined});
        }
      });
  }
};

module.exports = {
  add_admin,
  login_admin,
};