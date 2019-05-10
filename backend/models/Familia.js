'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FamilySchema = Schema({
    FamilyName: String,
    Encargado: [{}],
    Madre: [{}],
    Padre: [{}],
    Hijo: [{}]
})

module.exports = mongoose.model('Family', FamilySchema);