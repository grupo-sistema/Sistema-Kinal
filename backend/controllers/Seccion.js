'use strict'
var Seccion = require('../models/Seccion');

function GuardarSeccion (req, res){
    var seccion = new Seccion();
    var params = req.body;

    if(params.Seccion){
        seccion = {
            Seccion: params.Seccion
        }
        Seccion.find({$or: [
            {Seccion: seccion.Seccion}
        ]}).exec((err, busqueda)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(500).send({message: 'la seccion ya esta registrada'}); 
                }else{
                    Seccion.insertMany(seccion, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al guardar la seccion'});
                            }else{
                                res.status(200).send({Secciones: studentSave});
                            }
                        }
                    }); 
                }
        })
    }
}
function ListarSeccion (req, res){
    Seccion.find({},(err,section)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_Secciones: section});
            }
    });
}

module.exports = {
    GuardarSeccion,
    ListarSeccion
    }