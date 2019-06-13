'use strict'

var express = require('express');
var SeccionController = require('../controllers/Seccion');

var api = express.Router();

api.post('/save-section', SeccionController.GuardarSeccion);
api.get('/list-section', SeccionController.ListarSeccion);

module.exports = api;