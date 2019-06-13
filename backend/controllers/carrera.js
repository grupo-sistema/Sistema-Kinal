'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');
var Carrera = require('../models/Carrera');

function GuardarCarrera(req, res) {
    var carrera = new Carrera();
    var params = req.body;

    if (params.Nombre || params.Codigo || params.Descripcion) {
        carrera = {
            Nombre: params.Nombre,
            Codigo: params.Codigo,
            Descripcion: params.Descripcion
        }
        Carrera.find({
            $or: [
                { Nombre: carrera.Nombre, Codigo: carrera.Codigo }
            ]
        }).exec((err, busqueda) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion del usuario' });

            if (busqueda && busqueda.length >= 1) {
                return res.status(200).send({ message: 'la carrera ya está registrada' });
            } else {
                Carrera.insertMany(carrera, function (err, studentSave) {
                    if (err) {
                        res.status(500).send({ message: 'No se han guardado los datos correctamente' });
                    } else {
                        if (!studentSave) {
                            res.status(500).send({ message: 'Error al guardar la carrera' });
                        } else {
                            res.status(200).send({ carreras: studentSave });
                        }
                    }
                });
            }
        })
    } else {
        res.status(404).send({ message: 'Debe introducir los campos correctamente' });
    }
}
function ListarCarrera(req, res) {
    Carrera.find({}, (err, carrer) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'No se puede listar' });
        } else {
            res.status(200).send({ Listado_de_carreras: carrer });
        }
    });
}

module.exports = {
    GuardarCarrera,
    ListarCarrera
}