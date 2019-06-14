'use strict'

var express = require('express');
var JornadaController = require('../controllers/Jornada');

var api = express.Router();

api.post('/save-jornada', JornadaController.GuardarJornada);
api.get('/list-jornada', JornadaController.ListarJornada);

module.exports = api;