'use strict'

var express = require('express');
var CursoController = require('../controllers/Cursos');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/save-course', CursoController.GuardarCursos);
api.get('/list-course', CursoController.ListarCursos);

module.exports = api;