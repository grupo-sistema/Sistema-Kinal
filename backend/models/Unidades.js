'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnidadesSchema = Schema({
    Codigo: String,
    Nombre: String
});

module.exports = mongoose.model('Unidades', UnidadesSchema)