'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonaSchema = Schema({
    FirstName: String,
    SecondName: String,
    Surname: String,
    SecondSurname: String,
    Date: String,
    Religion: String,
    Email: String,
    Gender: String,
    Address: Object,
        Departament: String,
        Municipality:  String,
        Zone: String,
        Colony: String,
        Avenue: String,
        Street: String,
        Block: String,
        HouseNumber: String,
    telephone: Object,
        Mobile: String,
        Phone: String,
        Other: String
});


module.exports = mongoose.model('Persona', PersonaSchema); 