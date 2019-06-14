'use strict'
var Jornada = require('../models/Jornada');

function GuardarJornada (req, res){
    var jornada = new Jornada();
    var params = req.body;

    if(params.Jornada){
        jornada = {
            Jornada: params.Jornada
        }
        Jornada.find({$or: [
            {Jornada: jornada.Jornada}
        ]}).exec((err, busqueda)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(500).send({message: 'la Jornada ya esta registrada'}); 
                }else{
                    Jornada.insertMany(jornada, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al guardar la jornada'});
                            }else{
                                res.status(200).send({Jornadas: studentSave});
                            }
                        }
                    }); 
                }
        })
    }
}
function ListarJornada (req, res){
    Jornada.find({},(err,jornada)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_Jornadas: jornada});
            }
    });
}

module.exports = {
    GuardarJornada,
    ListarJornada
    }