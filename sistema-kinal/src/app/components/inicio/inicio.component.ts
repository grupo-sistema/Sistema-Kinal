import { Input, Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/person';

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
  model: NgbDateStruct;
  today = this.calendar.getToday();
  person: Person;
  alerts: Alert[];
  
  constructor(private calendar: NgbCalendar) { 
    this.person = new Person('','','','',null,'','','','','','');
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  message() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit() {
  }

}
