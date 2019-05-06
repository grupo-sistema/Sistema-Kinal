import { Input, Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person";
import { RestService } from "../../services/rest.service";
import Swal from 'sweetalert2';
import { checkAndUpdateBinding } from "@angular/core/src/view/util";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { CodigosService } from 'src/app/services/api/codigos.service';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: "success",
    message: "Datos enviados correctamente"
  }
];

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  person: Person;
  alerts: Alert[];
  email: string;
  correosGuardados = [];
  countries = [];
  hola;

  constructor(public rest: RestService) {
    this.rest.setPerson(this.person);
    this.person = new Person(
      "","","","","","",[],"","","","","","","","","","","","","",""
    );
  }

  // =========================================================================Funciones=============================================================
  
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  message() {
    Swal.fire("Datos guardados correctamente", "You clicked the button!", "success")
  }

  guardarCorreos(){
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
        this.person.Email = this.correosGuardados;
        this.rest.setPerson(this.person).subscribe(
          response => {
            if (response) {
              this.message();
              console.log(this.message);
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
