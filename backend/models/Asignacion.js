'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignacionSchema = Schema({
    Carrera: String,
    Grado: String,
    Jornada: String,
    Seccion: String,
    Curso: String,
    Instructor: String
});
module.exports = mongoose.model('Asignacion', AsignacionSchema)