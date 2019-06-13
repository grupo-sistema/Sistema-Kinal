'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructorSchema = Schema({
    Codigo: String,
    Instructor: String,
    Profesion: String
});
module.exports = mongoose.model('Instructor', InstructorSchema)