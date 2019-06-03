'use strict'
var RedEst = require('../models/RedEstudio');

function GuardarRed (req, res){
    var RedEstudio = new RedEst();
    var params = req.body;
    if(params.NombreRed && params.Inicio && params.Finalizacion && params.Carrera){
        RedEstudio = {
            NombreRed: params.NombreRed,
            Carrera: params.Carrera,
            Inicio: params.Inicio,
            Finalizacion: params.Finalizacion
        }
        RedEst.find({$or:[
            {NombreRed: RedEstudio.NombreRed, Inicio: RedEstudio.Inicio, Finalizacion: params.Finalizacion}
        ]}).exec((err, busqueda) =>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});
            if(busqueda && busqueda.length >= 1){
                return res.status(200).send({message: 'Ya se encuentra registrado la Red de Estudio con una misma duración'});
            }else{
                if(params.Finalizacion.localeCompare(params.Inicio) == 1){
                    if(params.Inicio != params.Finalizacion){
                        RedEst.insertMany(RedEstudio, function(err, RedSave){
                            if(err){
                                res.status(500).send({message: 'No se han guardado los datos correctamente'});
                            }else{
                                if(!RedSave){
                                    res.status(500).send({message: 'Error al guardar curso'});
                                }else{
                                    res.status(200).send({Redes_de_Estudio: RedSave});
                                }
                            }
                        });
                    }else{
                        res.status(200).send({message: 'La red de estudio no puede terminar el mismo dia de inicio'});
                    }
                }else{
                    res.status(200).send({message: 'La red de estudio no puede terminar antes de empezar'});
                }
            }
        })
    }else{
        res.status(404).send({message: 'Debe introducir los campos correctamente'});
    }
}

function ListarRed (req, res){
    RedEst.find({},(err, user)=>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'No se puede lsitar'});
        }else{
            res.status(200).send({Listado_Redes_Estudio: user});
        }
    });
}
module.exports = {
    GuardarRed,
    ListarRed
}