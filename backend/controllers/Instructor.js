'use strict'
var Instructor = require('../models/Instructor');

function GuardarInstructor (req, res){
    var instructor = new Instructor();
    var params = req.body;
    var numCod;

    if(params.Instructor && params.Profesion){
        Instructor.find({},(err,carrer)=>{
            if(err){
              console.log(err);
            }else{
                numCod = carrer.length + 1;
                instructor = {
                    Codigo: "K" + numCod + params.Instructor.charAt(0) + params.Profesion.charAt(0), 
                    Instructor: params.Instructor,
                    Profesion: params.Profesion
                }
                }
        });  
        Instructor.find({Instructor: params.Instructor}).exec((err, busqueda)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(200).send({message: 'instructor ya registrado'}); 
                }else{
                    Instructor.insertMany(instructor, function(err,instructorSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!instructorSave){
                                res.status(500).send({message: 'Error al guardar al instructor'});
                            }else{
                                res.status(200).send({Instructores: instructorSave});
                            }
                        }
                    }); 
                }
        })
    }else{
        res.status(404).send({message: 'Error, debe introducir todos los campos'});
    }
}

function ListarInstructor (req, res){
    Instructor.find({},(err,instructor)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_Instructores: instructor});
            }
    });
}

module.exports = {
    GuardarInstructor,
    ListarInstructor
    }