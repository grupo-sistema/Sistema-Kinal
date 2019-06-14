'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JornadaSchema = Schema({
    Jornada: String
});
module.exports = mongoose.model('Jornada', JornadaSchema)