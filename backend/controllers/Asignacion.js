'use strict'
var Asignacion = require('../models/Asignacion');

function GuardarAsignacion (req, res){
    var asignacion = new Asignacion();
    var params = req.body;

    console.log(asignacion)
    if(params.Grado && params.Jornada && params.Seccion && params.Instructor){
        asignacion = {
            Carrera: params.Carrera,
            Grado: params.Grado,
            Jornada: params.Jornada,
            Seccion: params.Seccion,
            Curso: params.Curso,
            Instructor: params.Instructor
        }
        Asignacion.find({$and: [
            {Carrera: params.Carrera},
            {Grado: params.Grado},
            {Jornada: params.Jornada},
            {Seccion: params.Seccion},
            {Curso: params.Curso},
            {Instructor: params.Instructor}
        ]}).exec((err, busqueda) =>{
            if(err) return res.status(500).send({message: 'Error en la petición del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(200).send({message: 'Esta asignación ha sido registrada'}); 
                }else{
                    Asignacion.insertMany(asignacion, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al registrar la asignación'});
                            }else{
                                res.status(200).send({asignacion: studentSave});
                            }
                        }
                    }); 
                }
        })
        }else{
        res.status(200).send({message: 'Debe introducir los campos correctamente'});
        }
}

function ListarAsignacion (req, res){
    Asignacion.find({},(err,adds)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_asignaciones: adds});
            }
    });
}

module.exports = {
    GuardarAsignacion,
    ListarAsignacion
    }