import { Component, OnInit } from '@angular/core';
import { Carrer } from 'src/app/models/carrer';
import { Study_Network } from 'src/app/models/study_network';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-redes-de-estudio',
  templateUrl: './redes-de-estudio.component.html',
  styleUrls: ['./redes-de-estudio.component.css']
})
export class RedesDeEstudioComponent implements OnInit {
  study_net: Study_Network;
  carrera: Carrer[];
  redEstudio: Study_Network[];
  dateinicio: Date;
  datefinal: Date;

  constructor(public rest: RestService) { 
    this.rest.setStudyNet(this.study_net);
    this.study_net = new Study_Network(
      "","","",""
    )
  }

  ngOnInit() {
    this.getCarrer();
    this.getStudyNet();
  }

  getStudyNet(){
    this.rest.getStudyNet().subscribe(res=>{
      console.log(res);
      this.redEstudio = res.Listado_Redes_Estudio
    })
  }

  getCarrer(){
    this.rest.getCarrer().subscribe(res=>{
      console.log(res);
      this.carrera = res.Listado_de_carreras
    })
  }

  onSubmit() {
    if(this.study_net.Carrera != "" && this.study_net.NombreRed != "" && this.study_net.Inicio != "" && this.study_net.Finalizacion != ""){
      if(this.study_net.Inicio == this.study_net.Finalizacion){
        Swal.fire("Las fechas ingresadas son las mismas, corrija");
      }else{
        this.rest.setStudyNet(this.study_net).subscribe(
          response => {
            if (response) {  
              this.getStudyNet();
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
      }    
    }else{
      Swal.fire("No puede dejar los campos vacios");
    }
  }

  network(){
      this.study_net.NombreRed = this.study_net.Carrera;
  }

  limpiarData(){
    this.study_net.Carrera = "";
    this.study_net.NombreRed = "";
    this.study_net.Inicio = "";
    this.study_net.Finalizacion = "";
  }
  
}
