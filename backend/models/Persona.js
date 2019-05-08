'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonaSchema = Schema({
    FirstName: String,
    SecondName: String,
    Surname: String,
    SecondSurname: String,
    MarriedSurname: String,
    CivlStatus: String,
    Date: String,
    Religion: String,
    Email: [],
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
    telephone: {
        Mobile: [],
        Phone: [],
        Other: []
    }
        
});


module.exports = mongoose.model('Persona', PersonaSchema); 