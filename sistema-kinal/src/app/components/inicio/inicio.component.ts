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
  hola;
  alerts: Alert[];
  countries = [];
  constructor(public rest: RestService) {
    this.rest.setPerson(this.person);
    this.person = new Person(
      "","","","","","","","","","","","","","","","","","","","",""
    );
    
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  message() {
    Swal.fire("Datos guardados correctamente", "You clicked the button!", "success")
  }

  ngOnInit() {
    this.obtenerData();
  }

  onSubmit() {
    if (this.hola) {
      if (
        this.person.FirstName != "" &&
        this.person.SecondName != "" &&
        this.person.Surname != "" &&
        this.person.SecondSurname != "" &&
        this.person.Date != "" &&
        this.person.Religion != "" &&
        this.person.Gender != "" &&
        this.person.Email != "" &&
        this.person.Departament != "" &&
        this.person.Municipality != "" &&
        this.person.Zone != "" &&
        this.person.Colony != "" &&
        this.person.Avenue != "" &&
        this.person.Street != "" &&
        this.person.Block != "" &&
        this.person.HouseNumber != "" &&
        this.person.Mobile != "" &&
        this.person.Phone != "" &&
        this.person.Other != ""
      ) {
        console.log(this.person);
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
    } else {
      console.log("no");
    }
  }

  //Combobox de paises solamente de america (Se pueden agregar mas)
  obtenerData(){
  fetch('http://restcountries.eu/rest/v1/region/americas')
  .then(response => response.json())
  .then(json =>  {this.countries = json; console.log(this.countries)})
  }


}
