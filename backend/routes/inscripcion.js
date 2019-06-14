'use strict'

var express = require('express');
var InscripcionController = require('../controllers/Inscripcion');

var api = express.Router();

api.post('/save-inscription', InscripcionController.GuardarInscripcion);
api.post('/save-inscriptionets', InscripcionController.GuardarInscripcionets);
api.get('/list-inscription', InscripcionController.ListarInscripciones);

module.exports = api;