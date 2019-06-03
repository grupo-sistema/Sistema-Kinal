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
          Swal.fire({type: 'error', title: 'Oops... Something went wrong!, please, try again',})
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
    Swal.fire({
      title: '¡Error!',
      text: "Parece que has dejado algunos campos vacios, revisa de nuevo",
      type: 'warning',
    })
  }
  }

  limpiarData(){
    this.carrer.Nombre = "";
    this.carrer.Descripcion = "";
    this.carrer.Codigo = "";
  }
}
