'use strict'

var express = require('express');
var AsignacionController = require('../controllers/Asignacion');

var api = express.Router();

api.post('/save-asignation', AsignacionController.GuardarAsignacion);
api.get('/list-asignation', AsignacionController.ListarAsignacion);

module.exports = api;