'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    Nombre: String,
    Usuario: String,
    Email: String,
    Password: String,
    Rol: String,
});


module.exports = mongoose.model('User', UserSchema);