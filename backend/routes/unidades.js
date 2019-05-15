'use strict'

var express = require('express');
var UnidadesController = require('../controllers/Unidades');
var api = express.Router();

api.get('/list-unity', UnidadesController.ListarUnidad);

module.exports = api;