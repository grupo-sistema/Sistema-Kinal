'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarreraSchema = Schema({
    Codigo: String,
    Nombre: String,
    Descripcion: String
});

module.exports = mongoose.model('Carrera', CarreraSchema)