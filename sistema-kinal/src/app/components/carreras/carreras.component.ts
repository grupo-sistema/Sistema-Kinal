import { Component, OnInit } from '@angular/core';
import { Carrer } from 'src/app/models/carrer';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

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
    if(this.carrer.Codigo != "" && this.carrer.Descripcion != "" && this.carrer.Nombre != ""){
    this.rest.setCarrer(this.carrer).subscribe(
      response => {
        if (response) {  
          this.getCarrer();
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
  }else{
    Swal.fire("No puede dejar los campos vacios");
  }
  }

  limpiarData(){
    this.carrer.Nombre = "";
    this.carrer.Descripcion = "";
    this.carrer.Codigo = "";
  }
}
