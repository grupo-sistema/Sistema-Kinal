'use strict'

var express = require('express');
var UserController = require('../controllers/Usuario');
var api = express.Router();

api.post('/agregar-usuario',  UserController.registrar);
api.post('/login',  UserController.login );

module.exports = api;