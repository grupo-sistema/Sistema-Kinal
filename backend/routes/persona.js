'use strict'

var express = require('express');
var PersonaController = require('../controllers/Persona');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/save-person', PersonaController.InsertStudent);
api.get('/list-person', PersonaController.reportStudent);
api.put('/edit-persona/:id', PersonaController.studentUpdate);
api.delete('/delete-usuario/:id', PersonaController.deleteStudent);
//api.get('/reporteProductos', md_auth.ensureAuth,AdminController.reporteProductos);

module.exports = api;