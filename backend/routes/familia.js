'use strict'

var express = require('express');
var FamilyController = require('../controllers/Familia');
var api = express.Router();

api.post('/save-family', FamilyController.InsertFamilyName);
api.post('/insert-member/:id',FamilyController.InsertFamilyMember);
api.get('/list-family', FamilyController.ListarFamilias);
module.exports = api;