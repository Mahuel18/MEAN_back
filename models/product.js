"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = Schema({
  name: { type: String, required: true },
  Slug : {type: String, required: true},
  gallery : [{type: Object, required: false}],
  portada: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required:true},
  content: {type: String, required:true},
  stock: {type: Number, required: true},
  nsales: {type: Number, default:0, required: true},
  npoints: {type: Number, default:0, required: true},
  category: {type: String, required: true},
  status: {type: String, default:'Edit', required: true},
  createdAt: { type: Date, default: Date.now, require: true }
});

module.exports = mongoose.model("product", ProductSchema);
