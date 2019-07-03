'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/Usuario');

function registrar(req, res){
    var user = new User();
    var params = req.body;

        if(params.Nombre && params.Usuario && params.Email && params.Password && params.Rol){ 
            user.Nombre = params.Nombre;
            user.Usuario = params.Usuario;
            user.Email = params.Email;
            user.Password = params.Password;
            user.Rol = params.Rol
    
            User.find({$or: [
                {Email: user.Email},
                {Usuario: user.Usuario}
            ]}).exec((err, users) =>{
    
                if(err) return res.status(500).send({message: 'Error en la peticion del usuario'}); 
    
                if(users && users.length >= 1){
                    return res.status(200).send({message: 'El usuario ya existe en el sistema'}); 
                }else{
                    user.save((err, usuarioGuardado)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar el usuario'});
                        if(usuarioGuardado){
                            res.status(200).send({user: usuarioGuardado}); 
                        }else{
                            res.status(404).send({message: 'no se ha podido registrar el usuario'})
                        }
                    })  
                }
            }) 
        }else{
            res.status(200).send({
                message: 'Rellene todos los campos necesarios'
            })
        } 
}

function login(req, res){
    var params = req.body;
    var email2 = params.Email;
    var password = params.Password;

    if(params.Email && params.Password){ 
        
        User.findOne({$or: [
            {Email: email2},
            {Usuario: email2}
        ]}).exec((err, user) =>{
            if(err) return res.status(500).send({message: 'error en la peticion' });
            if(user){        
                if(user.Password == password){
                    return res.status(200).send(user)
                }
                else{
                    return res.status(200).send({message: 'contra incorrecta'})
                }
            }else{
                return res.status(200).send({message: 'correo o usuario no encontrado'})
            }
        })
    }
}

module.exports = {
    registrar,
    login
}