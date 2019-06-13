'use strict'

var express = require('express');
var InstructorController = require('../controllers/Instructor');

var api = express.Router();

api.post('/save-instructor', InstructorController.GuardarInstructor);
api.get('/list-instructor', InstructorController.ListarInstructor);

module.exports = api;