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
        Swal.fire({type: 'error', title: 'Oops...', text: 'La red de estudio no puede terminar el mismo dia de inicio',
        })
      }else{
        this.rest.setStudyNet(this.study_net).subscribe(
          res => {
            if(res.message == 'Ya se encuentra registrado la Red de Estudio con una misma duración'){
              Swal.fire({type: 'error', title: 'Oops...', text: 'Al parecer ya tienes una red de estudio con la misma duracion',
              })
              // Swal.fire({
              //   title: 'Ya guardaste una red asi antes, proba con otra',
              //   width: 600,
              //   padding: '3em',
              //   background: '#fff url(https://steamuserimages-a.akamaihd.net/ugc/939446829393952254/8399D7DB1BF3130ED0CB6AF35300F46F0B3DB109/)',
              //   backdrop: `
              //     rgba(0,0,123,0.4)
              //     url("http://24.media.tumblr.com/8210fd413c5ce209678ef82d65731443/tumblr_mjphnqLpNy1s5jjtzo1_400.gif")
              //     center left
              //     no-repeat
              //   `
              // })
            }else{
                if(res.message == 'La red de estudio no puede terminar antes de empezar'){
                  Swal.fire({ type: 'error', title: 'Oops...', text: 'La red de estudio no puede terminar antes de empezar',
                  })
                }else{
                  if (res) {  
                    this.getStudyNet();
                    this.limpiarData();
                  } else {
                    Swal.fire("Error al guardar, intente de nuevo");
                  }
                }
              
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
      Swal.fire({ title: '¡Error!', text: "Parece que has dejado algunos campos vacios, revisa de nuevo", type: 'warning',
      })
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
