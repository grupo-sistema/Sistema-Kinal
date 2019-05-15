'use strict'

var express = require('express');
var CarreraController = require('../controllers/Carrera');

var api = express.Router();

api.post('/save-carrer', CarreraController.GuardarCarrera);
api.get('/list-carrer', CarreraController.ListarCarrera);

module.exports = api;