'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignacionSchema = Schema({
    NombreRed: String,
    Inicio: String,
    Finalizacion: String,
    Grado: String,
    Jornada: String,
    Seccion: String,
    Curso: String,
    Instructor: String
});
module.exports = mongoose.model('Asignacion', AsignacionSchema)