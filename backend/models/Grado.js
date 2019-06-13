'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GradoSchema = Schema({
    Grado: String
});
module.exports = mongoose.model('Grado', GradoSchema)