'use strict'
var Grado = require('../models/Grado');

function GuardarGrado (req, res){
    var grado = new Grado();
    var params = req.body;

    if(params.Grado){
        grado = {
            Grado: params.Grado
        }
        Grado.find({$or: [
            {Grado: grado.Grado}
        ]}).exec((err, busqueda)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
    
                if(busqueda && busqueda.length >= 1){
                    return res.status(500).send({message: 'El grado ya está registrado'}); 
                }else{
                    Grado.insertMany(grado, function(err,studentSave){
                        if(err){
                            res.status(500).send({message: 'No se han guardado los datos correctamente'});
                        }else{
                            if(!studentSave){
                                res.status(500).send({message: 'Error al guardar el grado'});
                            }else{
                                res.status(200).send({Grados: studentSave});
                            }
                        }
                    }); 
                }
        })
    }
}
function ListarGrado (req, res){
    Grado.find({},(err,grade)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_Grados: grade});
            }
    });
}

module.exports = {
    GuardarGrado,
    ListarGrado
    }