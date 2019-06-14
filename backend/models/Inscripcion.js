'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InscripcionSchema = Schema({
    Estudiante: String,
    UnidadAcademica: String,
    Cuota: String,
    Grado: String,
    Carrera: String,
    Jornada: String,
    Curso: String
});
module.exports = mongoose.model('Inscripcion', InscripcionSchema)