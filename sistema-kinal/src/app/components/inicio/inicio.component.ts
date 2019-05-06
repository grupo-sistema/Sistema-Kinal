import { Input, Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person";
import { RestService } from "../../services/rest.service";
import Swal from 'sweetalert2';
import { checkAndUpdateBinding } from "@angular/core/src/view/util";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { CodigosService } from 'src/app/services/api/codigos.service';

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
  EstadoCivil: string;
  mobilesGuardados = [];
  phonesGuardados = [];
  othersGuardados = [];
  numerosGuardados = [];
  correosGuardados = [];
  countries = [];
  hola;

  constructor(public rest: RestService) {
    this.rest.setPerson(this.person);
    this.person = new Person(
      "","","","","","",[],"","","","","","","","","","","",[],[],[]
    );
  }

  // =========================================================================Funciones=============================================================
  
  message() {
    Swal.fire("Datos guardados correctamente", "You clicked the button!", "success")
  }

  guardarMobile(){
    if(this.mobilesGuardados.length == 3){
      console.log("Ya no puedes guardar mas mobiles")
    }else{
      if(this.mobile == "" || this.mobile == undefined){
        console.log("No has metido datos");
      }else{
        this.mobilesGuardados.push(this.mobile)
        this.numerosGuardados.push(this.mobile)
        console.log(this.numerosGuardados)
      }
    }
  }

  guardarPhone(){
    if(this.phonesGuardados.length == 3){
      console.log("Ya no puedes guardar mas telefonos")
    }else{
      if(this.phone == "" || this.phone == undefined){
        console.log("No has metido datos");
      }else{
        this.phonesGuardados.push(this.phone)
        this.numerosGuardados.push(this.phone)
        console.log(this.numerosGuardados)
      }
    }
  }

  guardarOther(){
    if(this.othersGuardados.length == 3){
      console.log("Ya no puedes guardar otros números")
    }else{
      if(this.other == "" || this.other == undefined){
        console.log("No has metido datos");
      }else{
        this.othersGuardados.push(this.other)
        this.numerosGuardados.push(this.other)
        console.log(this.other)
      }
    }
  }

  guardarCorreos(){
    
    console.log(this.person)
    if(this.correosGuardados.length == 3){
      console.log("Ya no puedes guardar mas datos")
    }
    else{
      if(this.email == "" || this.email == undefined){
        console.log("No has metido datos");
      }else{
        this.correosGuardados.push(this.email)
        console.log(this.correosGuardados)
      }
    } 
  }

  ngOnInit() {
    this.obtenerData();
  }

  onSubmit() {
    if(this.hola){
      if (this.person.FirstName != "" && this.person.SecondName != "" && this.person.Surname != "" && this.person.SecondSurname != "" && this.person.Date != "" && this.person.Religion != "" && this.person.Gender != "" && this.person.Departament != "" &&this.person.Municipality != "") {
        console.log(this.person);
        this.person.Mobile = this.mobilesGuardados;
        this.person.Phone = this.phonesGuardados;
        this.person.Other = this.othersGuardados;
        this.person.Email = this.correosGuardados;
        this.rest.setPerson(this.person).subscribe(
          response => {
            if (response) {
              this.message();
            } else {
              console.log("Error al guardar");
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      } else {
        Swal.fire("Debe llenar todos los campos necesarios para continuar");
      }
    }else{
    }
  }

  //Combobox de paises solamente de america (Se pueden agregar mas)
  obtenerData(){
  fetch('http://restcountries.eu/rest/v1/region/americas')
  .then(response => response.json())
  .then(json =>  {this.countries = json; console.log(this.countries)})
  }
}
