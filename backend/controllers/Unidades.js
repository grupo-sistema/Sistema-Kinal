'use strict'

var Unidades = require('../models/Unidades');

function ListarUnidad (req, res){
    Unidades.find({},(err,unity)=>{
        if(err){
          console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
                res.status(200).send({Listado_de_unidades: unity});
            }
    });
}

module.exports = {
    ListarUnidad
}