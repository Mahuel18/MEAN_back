'use strict'

let express = require('express');
let adminController = require('../controllers/adminController');

let api = express.Router();

api.post('/add_admin', adminController.add_admin);
api.post('/login_admin', adminController.login_admin);

module.exports = api;