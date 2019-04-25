import { Input, Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { RestService } from '../../services/rest.service';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Datos enviados correctamente',
}
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  person: Person;
  alerts: Alert[];
  
  constructor(public rest: RestService) { 
    this.rest.setPerson(this.person);
    this.person = new Person('','','','','','','','','','','','','','','','','','','','','');
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  message() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.person);
    this.rest.setPerson(this.person).subscribe(
      response => {
        if(response){
          console.log(this.message);
        }else{
          console.log('Error al guardar')
        }
      },
      error => {
        console.log(<any>error);
      }
    )
    
  }
}
