'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeccionSchema = Schema({
    Seccion: String
});
module.exports = mongoose.model('Seccion', SeccionSchema)