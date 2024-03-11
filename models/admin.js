'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema = Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, required: true},
    dni: {type: String, required: true},
});

module.exports = mongoose.model('admin',AdminSchema);