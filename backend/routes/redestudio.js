'use strict'

var express = require('express');
var REController = require('../controllers/RedEstudio');

var api = express.Router();

api.post('/save-study_net', REController.GuardarRed);
api.get('/list-study_net', REController.ListarRed);

module.exports = api;