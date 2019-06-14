'use strict'
var Inscripcion = require('../models/Inscripcion');

function GuardarInscripcion (req, res){
    var inscripcion = new Inscripcion();
    var params = req.body; 

    if(params.Estudiante && params.UnidadAcademica && params.Grado && params.Cuota && params.Carrera && params.Jornada){
    inscripcion = {
        Estudiante: params.Estudiante,
        UnidadAcademica: params.UnidadAcademica,
        Cuota: params.Cuota,
        Grado: params.Grado,
        Carrera: params.Carrera,
        Jornada: params.Jornada
    }
    Inscripcion.find({$and:[
        {Estudiante: params.Estudiante},
        {UnidadAcademica: params.UnidadAcademica},
        {Cuota: params.Cuota},
        {Grado: params.Grado},
        {Carrera: params.Carrera},
        {Jornada: params.Jornada}
    ]}).exec((err, busqueda) =>{
        if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(200).send({message: 'Inscripcion ya registrada'}); 
                }else{
                    Inscripcion.insertMany(inscripcion, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al registrar inscripcion'});
                            }else{
                                res.status(200).send({Inscritos: studentSave});
                            }
                        }
                    }); 
                }
    })
    }else{
    res.status(404).send({message: 'Debe introducir los campos correctamente'});
    }
}

function ListarInscripciones (req, res){
    Inscripcion.find({},(err,user)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_inscripciones: user});
            }
    });
}
module.exports = {
    GuardarInscripcion,
    ListarInscripciones
    }