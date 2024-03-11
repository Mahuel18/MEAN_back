"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ClientSchema = Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  country: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String, default: "perfil.png", required: true },
  phone: { type: String, required: false },
  dob: { type: String, required: false },
  gender: { type: String, required: false },
  dni: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, require: true },
});

module.exports = mongoose.model("client", ClientSchema);
