'use strict'
var Family = require('../models/Familia');
var Persona = require('../models/Persona');


// ========================================================================Crear familia================================================
function InsertFamilyName(req, res){
    var family = new Family();
    var params = req.body;
        if(params.FamilyName){ 
            family.FamilyName = params.FamilyName;
            Family.find({$or: [
                {FamilyName: family.FamilyName}
            ]}).exec((err, busqueda) =>{
                if(err) return res.status(500).send({message: 'Error en la peticion del usuario'});
                if(busqueda && busqueda.length >= 1){
                    return res.status(500).send({message: 'La Familia ya esta registrada'}); 
                }else{
                    family.save((err, familiaGuardada)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar la familia'});    
                        if(familiaGuardada){
                            res.status(200).send({Familia: familiaGuardada}); 
                        }else{
                            res.status(404).send({message: 'no se ha podido rgistrar la familia'}) 
                        }
                    })
                }
            }) 

        }else{
            res.status(200).send({
                message: 'Introduzca el nombre de la Familia'
            })
        }  
};

// =======================================================================Insertar miembro a una familia=================================
function InsertFamilyMember(req, res){
    var familiaID = req.params.id;
    var params = req.body;

    if(params.Encargado){
        Family.findById(familiaID, (err, Familyfound) =>{
            if(err){
                res.status(404).send({message: 'error al encontrar familia'});
            }else{
                if(Familyfound){
                    Persona.findById({_id: params.Encargado},(err, Persona_a_cargo) =>{
                        if(err){
                            res.status(404).send({message: 'error al encontrar miembro de la familia'});
                        }else{
                            if(Persona_a_cargo){
                                if(Familyfound.Encargado.length != 0){
                                    res.status(404).send({message: 'La familia ya contiene un encargado'});     
                                }else{
                                    Familyfound.Encargado.push(Persona_a_cargo)
                                    Familyfound.save();
                                    res.status(200).send(Familyfound)
                                }
                            }
                        }
                    });
                }
            }
        })
    }else if(params.Madre){
        Family.findById(familiaID, (err, Familyfound) =>{
            if(err){
                res.status(404).send({message: 'error al encontrar familia'});
            }else{
                if(Familyfound){
                    Persona.findById({_id: params.Madre},(err, Persona_a_cargo) =>{
                        if(err){
                            res.status(404).send({message: 'error al encontrar miembro de la familia'});
                        }else{
                            if(Persona_a_cargo){
                                if(Familyfound.Madre.length != 0){
                                    res.status(404).send({message: 'La familia ya contiene una mama'});     
                                }else{
                                    Familyfound.Madre.push(Persona_a_cargo)
                                    Familyfound.save();
                                    res.status(200).send(Familyfound)
                                }
                            }
                        }
                    });
                }
            }
        })
    }else if(params.Padre){
        Family.findById(familiaID, (err, Familyfound) =>{
            if(err){
                res.status(404).send({message: 'error al encontrar familia'});
            }else{
                if(Familyfound){
                    Persona.findById({_id: params.Padre},(err, Persona_a_cargo) =>{
                        if(err){
                            res.status(404).send({message: 'error al encontrar miembro de la familia'});
                        }else{
                            if(Persona_a_cargo){
                                if(Familyfound.Padre.length != 0){
                                    res.status(404).send({message: 'La familia ya contiene un papa'});     
                                }else{
                                     Familyfound.Padre.push(Persona_a_cargo)
                                     Familyfound.save();
                                     res.status(200).send(Familyfound)
                                }
                            }
                        }
                    });
                }
            }
        })
    }else if(params.Hijo){
        Family.findById(familiaID, (err, Familyfound) =>{
            if(err){
                res.status(404).send({message: 'error al encontrar familia'});
            }else{
                if(Familyfound){
                    Persona.findById({_id: params.Hijo},(err, Persona_a_cargo) =>{
                        if(err){
                            res.status(404).send({message: 'error al encontrar miembro de la familia'});
                        }else{
                            if(Persona_a_cargo){
                                Familyfound.Hijo.push(Persona_a_cargo)
                                Familyfound.save();
                                res.status(200).send(Familyfound)
                            }
                        }
                    });
                }
            }
        })
    }else{
        res.status(404).send({message: 'Error, debe introducir todos los campos'});
    }
}

//=====================================================================Listar Familias================================================
function ListarFamilias(req, res){
    Family.find({},(err,family)=>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'No se puede listar'});
        }else{
            res.status(200).send({Listado_de_Familias: family});
        }
    });
}
module.exports = {
    InsertFamilyName,
    InsertFamilyMember,
    ListarFamilias
}