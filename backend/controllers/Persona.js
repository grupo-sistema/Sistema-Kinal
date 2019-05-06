"use strict";
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var path = require("path");
var fs = require("fs");
var Persona = require("../models/Persona");

//================================================Crear Persona============================================

function InsertStudent(req, res) {
  var student = new Persona();
  var params = req.body;
  var direccion = [];
  var telefono = [];
  if (
    params.FirstName &&
    params.SecondName &&
    params.Surname &&
    params.SecondSurname &&
    params.Date &&
    params.Religion &&
    params.Gender &&
    params.Departament &&
    params.Municipality &&
    params.Zone &&
    params.Colony &&
    params.Avenue &&
    params.Street &&
    params.Block &&
    params.HouseNumber &&
    params.Mobile &&
    params.Phone &&
    params.Other
  ) {
    student = {
      FirstName: params.FirstName,
      SecondName: params.SecondName,
      Surname: params.Surname,
      SecondSurname: params.SecondSurname,
      Date: params.Date,
      MarriedSurname: params.MarriedSurname,
      CivilStatus: params.CivilStatus,
      Religion: params.Religion,
      Gender: params.Gender,
      Email: params.Email,
      Address: (direccion = {
        Departament: params.Departament,
        Municipality: params.Municipality,
        Zone: params.Zone,
        Colony: params.Colony,
        Avenue: params.Avenue,
        Street: params.Street,
        Block: params.Block,
        HouseNumber: params.HouseNumber
      }),
      telephone: (telefono = {
        Mobile: params.Mobile,
        Phone: params.Phone,
        Other: params.Other
      })
    };
    Persona.findOne({ FirstName: student.FirstName.toLowerCase() },(err, issetAdmin) => {
          if (err) {
            res.status(500).send({ message: "No se han guardado los datos correctamente" });
          } else {
            Persona.insertMany(student, function(err, peopleSave) {
            if (!issetAdmin) {
              if (!peopleSave) {
                res.status(500).send({ message: "Error al guardar al alumno" });
              } else {
                res.status(200).send({ Persona_guardada: peopleSave });
              }
           
            } else {
              res.status(500).send({ message: "No puede guardar datos duplicados" });
            }
        });
          }
      }
    );
  } else {
    res.status(404).send({ message: "Debe introducir los campos correctamente" });
  }
}
//================================================Listar Persona============================================

function reportStudent(req, res) {
  Persona.find(/* Encuentra al usuario */ {}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "No se puede listar" });
    } else {
      res.status(200).send({Usuarios_del_sistema: user });
    }
  });
}

//================================================Actualizar Persona============================================

function studentUpdate(req, res) {
  var studentID = req.params.id;
  var params = req.body;
  var direccion = [];
  var telefono = [];
  Persona.updateMany(
    { _id: studentID },
    {
      $set: {
        FirstName: params.FirstName,
        SecondName: params.SecondName,
        Surname: params.Surname,
        SecondSurname: params.SecondName,
        Date: params.Date,
        Religion: params.Religion,
        Email: params.Email,
        Gender: params.Gender,
        Address: (direccion = {
          Departament: params.Departament,
          Municipality: params.Municipality,
          Zone: params.Zone,
          Colony: params.Colony,
          Avenue: params.Avenue,
          Street: params.Street,
          Block: params.Block,
          HouseNumber: params.HouseNumber
        }),
        telephone: (telefono = {
          Mobile: params.Mobile,
          Phone: params.Phone,
          Other: params.Other
        })
      }
    },
    {
      new: true
    },
    (err, studentUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error al actualizar a la student." });
      } else {
        if (!studentUpdate) {
          res
            .status(404)
            .send({ message: "No se ha podido actualizar a la student." });
        } else {
          res.status(200).send({ student: studentUpdate });
        }
      }
    }
  );
}

//================================================Eliminar Persona============================================

function deleteStudent(req, res) {
  var studentID = req.params.id;

  Persona.findByIdAndRemove(studentID, (err, Delete) => {
    if (err) return res.status(500).send({ message: "Error en la Peticion" });
    if (!Delete)
      return res
        .status(404)
        .send({ message: "No se ha podido borrar los Datos del Usuario" });
    if (err) return next(err);
    res.send("Se ha eliminado al Usuario Correctamente");
  });
}

//================================================Buscar Persona============================================

function searchPerson(req, res){
  var params = req.body;

  Persona.find({$or: [{FirstName: params.search },{SecondName: params.search},{Surname: params.search}]}, (err, encontrado)=>{
    if(err){
      res.status(404).send({message: 'Error general'})
    }else{
      if(!encontrado){
        res.status(200).send({message: 'No hay registros'});
      }else{
        res.status(200).send({Usuario_encontrado: encontrado});
      }
    }
  });
}

//================================================Crear Persona============================================

function InsertEmail(req, res) {
  var personID = req.params.id;
  var params = req.body;

  if (params.Correo){
    Persona.findById({_id: personID}, (err,encontrado)=>{
      if(err){
        res.status(500).send({message: "Error"});
      }else{
        if(!encontrado){
          res.status(404).send({message: "No existe esa persona"});
        }else{
          encontrado.Email.push({Correo: params.Correo});
          encontrado.save();
          res.status(200).send({Correo_Ingresado: encontrado});
        }
      }
    })
  }
}

module.exports = {
  InsertStudent,
  reportStudent,
  deleteStudent,
  studentUpdate,
  searchPerson,
  InsertEmail
};
