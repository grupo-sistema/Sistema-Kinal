"use strict";
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var path = require("path");
var fs = require("fs");
var Persona = require("../models/Persona");

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
    params.Email &&
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
    };
    Persona.findOne({ email: student.Email.toLowerCase() },(err, issetAdmin) => {
          if (err) {
            res.status(500).send({ message: "No se han guardado los datos correctamente" });
          } else {
            Persona.insertMany(student, function(err, studentSave) {
            if (!issetAdmin) {

              if (!studentSave) {
                res.status(500).send({ message: "Error al guardar al alumno" });
              } else {
                res.status(200).send({ student: studentSave });
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

function reportStudent(req, res) {
  Persona.find(/* Encuentra al usuario */ {}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "No se puede listar" });
    } else {
      res.status(200).send({ user: user });
    }
  });
}
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
module.exports = {
  InsertStudent,
  reportStudent,
  deleteStudent,
  studentUpdate
};
