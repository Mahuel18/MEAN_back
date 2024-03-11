"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InvetorySchema = Schema({
  product: { type: Schema.ObjectId, ref:'product' , required: true },
  amount : { type: Number, required: true},
  admin : { type: Schema.ObjectId, ref:'admin', required: true },
  provider: { type: String, required: true},
  createdAt: { type: Date, default: Date.now, require: true },
});

module.exports = mongoose.model("inventory", InvetorySchema);
