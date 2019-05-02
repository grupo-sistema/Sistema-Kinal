import { Input, Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { RestService } from '../../services/rest.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Datos enviados correctamente',
},
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  person: Person;
  hola;
  alerts: Alert[];
  
  constructor(public rest: RestService) { 
    this.rest.setPerson(this.person);
    this.person = new Person('','','','','','','','','','','','','','','','','','','','','');
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  message() {
    if(this.person.FirstName == "" && this.person.SecondName == "" && this.person.Surname =="" && this.person.SecondSurname=="" && this.person.Date=="" && this.person.Religion=="" && this.person.Gender=="" && this.person.Email=="" && this.person.Departament=="" && this.person.Municipality=="" && this.person.Zone=="" && this.person.Colony=="" && this.person.Avenue=="" && this.person.Street=="" && this.person.Block=="" && this.person.HouseNumber=="" && this.person.Mobile=="" && this.person.Phone==""){
      this.alerts = Array.from(ALERTS);
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.hola){
      console.log(this.person);
      this.rest.setPerson(this.person).subscribe(
        response => {
          if(response){
            this.message();
            console.log(this.message);
          }else{
            console.log('Error al guardar')
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }else{
      ("no")
    }
  }
}
