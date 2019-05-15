'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

var person = require('./routes/persona');
var family = require('./routes/familia');
var course = require('./routes/cursos');
var carrer = require('./routes/carrera');
var unity = require('./routes/unidades');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1', person);
app.use('/v1', family);
app.use('/v1', course);
app.use('/v1', carrer);
app.use('/v1', unity);

module.exports = app;
