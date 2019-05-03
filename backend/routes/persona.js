'use strict'

var express = require('express');
var PersonaController = require('../controllers/Persona');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/save-person', PersonaController.InsertStudent);
api.post('/save-email/:id', PersonaController.InsertEmail);
api.get('/list-person', PersonaController.reportStudent);
api.post('/search-person', PersonaController.searchPerson);
api.put('/edit-persona/:id', PersonaController.studentUpdate);
api.delete('/delete-usuario/:id', PersonaController.deleteStudent);
//api.get('/reporteProductos', md_auth.ensureAuth,AdminController.reporteProductos);

module.exports = api;