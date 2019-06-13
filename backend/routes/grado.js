'use strict'

var express = require('express');
var GradoController = require('../controllers/Grado');

var api = express.Router();

api.post('/save-grade', GradoController.GuardarGrado);
api.get('/list-grade', GradoController.ListarGrado);

module.exports = api;