import { Input, Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person";
import { RestService } from "../../services/rest.service";
import Swal from "sweetalert2";
import { checkAndUpdateBinding } from "@angular/core/src/view/util";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { CodigosService } from "src/app/services/api/codigos.service";
import { count } from 'rxjs/operators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  person: Person;
  email: string;
  phone: string;
  mobile: string;
  other: string;
  plusmobile: string;
  plusphone: string;
  plusother: string;
  mostrar = false;
  mobilesGuardados = [];
  phonesGuardados = [];
  othersGuardados = [];
  numerosGuardados = [];
  correosGuardados = [];
  direccionesGuardadas = [];
  countries = [];
  hola;


  constructor(public rest: RestService) {
    //this.rest.setPerson(this.person);
    this.person = new Person(
      "","","","","","","","","",[],"","","","","","","","","","","","",[],[],[]
    );
  }

  // =========================================================================Funciones=============================================================

  message() {
    if (
      this.person.FirstName != "" && this.person.Surname != "" && this.person.Date != "" && this.person.Religion != "" && this.person.Gender != "" && this.person.Departament != "" && this.person.Municipality != "") {
      Swal.fire("Datos guardados correctamente", "You clicked the button!", "success");
    } else {
      Swal.fire("Debe llenar todos los campos necesarios para continuar");
    }
  }


  validarAC() {
    if (this.person.Gender == "Femenino" && this.person.CivilStatus == "Casada") {
      this.mostrar = true;
    } else {
      this.mostrar = false;
      this.person.MarriedSurname = "";
    }
  }

  guardarMobile() {
    if (this.mobilesGuardados.length == 3) {
      console.log("Ya no puedes guardar mas mobiles");
    } else {
      if (this.mobile == "" || this.mobile == undefined) {
        console.log("No has metido datos");
      } else {
        if (this.plusmobile == undefined) {
          console.log("Selecciona una extension");
        } else {
          this.mobilesGuardados.push("+" + "(" + this.plusmobile + ")" + " " + this.mobile);
          this.numerosGuardados.push("+" + "(" + this.plusmobile + ")" + " " + this.mobile);
          this.mobile = "";
          console.log(this.numerosGuardados);
        }
      }
    }
  }

  guardarPhone() {
    if (this.phonesGuardados.length == 3) {
      console.log("Ya no puedes guardar mas telefonos");
    } else {
      if (this.phone == "" || this.phone == undefined) {
        console.log("No has metido datos");
      } else {
        if (this.plusphone == undefined) {
          console.log("Selecciona una extension");
        } else {
          this.phonesGuardados.push("+" + "(" + this.plusphone + ")" + " " + this.phone);
          this.numerosGuardados.push("+" + "(" + this.plusphone + ")" + " " + this.phone);
          this.phone = "";
          console.log(this.numerosGuardados);
        }
      }
    }
  }

  guardarOther() {
    if (this.othersGuardados.length == 3) {
      console.log("Ya no puedes guardar otros números");
    } else {
      if (this.other == "" || this.other == undefined) {
        console.log("No has metido datos");
      } else {
        if (this.plusother == undefined) {
          console.log("Selecciona una extension");
        } else {
          this.othersGuardados.push("+" + "(" + this.plusother + ")" + " " + this.other);
          this.numerosGuardados.push("+" + "(" + this.plusother + ")" + " " + this.other);
          this.other = "";
          console.log(this.numerosGuardados);
        }
      }
    }
  }

  validarEmail(valor) {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
      console.log("La dirección de email " + valor + " es correcta.");
      this.guardarCorreos();
    } else {
      Swal.fire("La dirección de email es incorrecta.");
    }
    console.log(valor)
  }

  guardarCorreos() {
    if (this.correosGuardados.length == 3) {
      console.log("Ya no puedes guardar mas correos")
    }
    else {
      if (this.email == "" || this.email == undefined) {
        console.log("No has metido correos");
      } else {
        this.correosGuardados.push(this.email);
        console.log(this.correosGuardados);
      }
    }
  }


  guardarDirecciones() {
    if (this.person.Departament == "" || this.person.Municipality == "" || this.person.Zone == "" || (this.person.Colony == "" || undefined) || (this.person.Avenue == "" || undefined) || (this.person.Street == "" || undefined) || (this.person.Block == "" || undefined) || (this.person.HouseNumber == "" || undefined) || (this.person.Specific == "" || undefined)) {
      console.log("Llena los datos que te faltan")
    } else {
      if (this.direccionesGuardadas.length == 3) {
        console.log("Ya no puedes guardar mas direcciones")
      }
      else {
        this.direccionesGuardadas.push(this.person.Departament + ", " + this.person.Municipality + ". " + this.person.Zone + " '" + this.person.Colony + "' " + this.person.Avenue + "Ave. " + this.person.Street + "calle. Bloque " + this.person.Block + " " + this.person.HouseNumber + ". '" + this.person.Specific + "' ");
        console.log(this.direccionesGuardadas);
      }
    }
  }

  ngOnInit() {
    this.obtenerData();
  }

  onSubmit() {
    //if (this.hola) {
      console.log(this.person);
      this.person.MarriedSurname = ("De " + this.person.MarriedSurname);
      this.person.Mobile = this.mobilesGuardados;
      this.person.Phone = this.phonesGuardados;
      this.person.Other = this.othersGuardados;
      this.person.Email = this.correosGuardados;
      
      this.rest.setPerson(this.person).subscribe(
        response => {
          if (response) {
            //this.message();
            this.limpiarData();
          } else {
            console.log("Error al guardar");
          }
        },
        error => {
          console.log(<any>error);
        }
      )
      error => {
        console.log(<any>error);
      }
    //}
  }

  limpiarData() {
    this.person.FirstName = "";
    this.person.SecondName = "";
    this.person.Surname = "";
    this.person.SecondSurname = "";
    this.person.MarriedSurname = "";
    this.person.Date = "";
    this.person.Religion = "";
    this.person.Gender = "";
    this.person.CivilStatus = "";
    this.person.Address = "";
    this.correosGuardados = [];
    this.person.Departament = "";
    this.person.Municipality = "";
    this.person.Zone = "";
    this.person.Colony = "";
    this.person.Avenue = "";
    this.person.Street = "";
    this.person.Block = "";
    this.person.HouseNumber = "";
    this.person.Specific = "";
    this.direccionesGuardadas = [];
    this.mobilesGuardados = [];
    this.phonesGuardados = [];
    this.othersGuardados = [];
    this.numerosGuardados = [];
    this.plusmobile = "";
    this.plusother = "";
    this.plusphone = "";
  }

  //Combobox de paises solamente de america (Se pueden agregar mas)
  obtenerData() {
    fetch("http://restcountries.eu/rest/v1/region/americas")
      .then(response => response.json())
      .then(json => {
        this.countries = json;
      });
  }
}