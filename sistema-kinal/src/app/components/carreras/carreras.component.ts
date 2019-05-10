import { Component, OnInit } from '@angular/core';
import { Carrer } from 'src/app/models/carrer';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
carrer: Carrer;
carrera: Carrer[];

  constructor(public rest: RestService) { 
    this.rest.setCarrer(this.carrer);
    this.carrer = new Carrer(
      "","",""
    );
  }

  ngOnInit() {
    this.getCarrer();
  }

  getCarrer(){
    this.rest.getCarrer().subscribe(res=>{
      console.log(res);
      this.carrera = res.Listado_de_carreras
    })
  }
  
  onSubmit() {
    this.rest.setCarrer(this.carrer).subscribe(
      response => {
        if (response) {
          this.getCarrer();
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
  }
}
