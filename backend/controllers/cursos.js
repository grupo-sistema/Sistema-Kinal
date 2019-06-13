'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');
var Cursos = require('../models/Cursos');

function GuardarCursos (req, res){
    var cursos = new Cursos();
    var params = req.body; 
    if(params.Nombre && params.Codigo && params.Descripcion){
    cursos = {
        Nombre: params.Nombre,
        Codigo: params.Codigo,
        Descripcion: params.Descripcion
    }
    Cursos.find({$or:[
        {Nombre: cursos.Nombre, Codigo: cursos.Codigo}
    ]}).exec((err, busqueda) =>{
        if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(200).send({message: 'el curso ya esta registrado'}); 
                }else{
                    Cursos.insertMany(cursos, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al guardar curso'});
                            }else{
                                res.status(200).send({cursos: studentSave});
                            }
                        }
                    }); 
                }
    })
    }else{
    res.status(404).send({message: 'Debe introducir los campos correctamente'});
    }
}
function ListarCursos (req, res){
    Cursos.find/* Encuentra al usuario */({},(err,user)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_cursos: user});
            }
    });
}

module.exports = {
    GuardarCursos,
    ListarCursos
}