'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave secreta';

exports.createtoken = function(Persona){
  var payload = {
      sub: Persona._id,
      PrimerNombre: Persona.PrimerNombre,
      SegundoNombre: Persona.SegundoNombre,
      PrimerApellido: Persona.PrimerApellido,
      SegundoApellido: Persona.SegundoApellido,
      fecha: Persona.fecha,
      Religion: Persona.Religion,
      CorreoElectronico: Persona.CorreoElectronico,
      Genero: Persona.Genero,
      Direccion: Persona.Direccion,
      Telefono: Persona.Telefono,
      iat: moment().unix(),
      exp: moment().day(30, 'days').unix
  };
      return jwt.encode(payload, secret);

};
