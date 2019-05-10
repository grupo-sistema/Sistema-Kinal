'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    Codigo: String,
    Nombre: String,
    Descripcion: String
});

module.exports = mongoose.model('Cursos', CursoSchema)