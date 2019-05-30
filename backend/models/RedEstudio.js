'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RedEstudioSchema = Schema({
    NombreRed: String,
    Carrera: String,
    Inicio: String,
    Finalizacion: String
});
module.exports = mongoose.model('RedEstudio', RedEstudioSchema)