import { Component, OnInit } from '@angular/core';
import { Study_Network } from 'src/app/models/study_network';
import { Jornada } from 'src/app/models/jornada';
import { Grade } from 'src/app/models/grade';
import { Asignation } from 'src/app/models/asignation';
import { Seccion } from 'src/app/models/seccion';
import { Course } from 'src/app/models/course';
import { Instructor } from 'src/app/models/instructor';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  asignation: Asignation;
  asignaciones: Asignation[];
  jornadas: Jornada[];
  grados: Grade[];
  secciones: Seccion[];
  cursos: Course;
  redes: Study_Network[];
  instructores: Instructor[];
  seleccionado;
  mostrar = false;

  constructor(public rest: RestService) {
    this.rest.setAsignation(this.asignation);
    this.asignation = new Asignation(
      "", "", "", "", "", "", "", ""
    );
  }

  ValidacionGrado(){
    if(this.asignation.Grado == "1ero Básico" || this.asignation.Grado == "2do Básico" || this.asignation.Grado == "3ero Básico"){
      this.mostrar = false;
    }else{
      if(this.asignation.Grado == "4to Diversificado" || this.asignation.Grado == "5to Diversificado" || this.asignation.Grado == "6to Diversificado"){
        this.mostrar = true;
      }
    }

  }

  ngOnInit() {
    this.getAsignation();
    this.getStudyNet();
    this.getCourse();
    this.getInstructor();
    this.getGrade();
    this.getSection();
    this.getJornada();
  }

  onSubmit() {
    var red = this.getSeleccionado(this.seleccionado);

    if(this.asignation.Grado == "1ero Básico" || this.asignation.Grado == "2do Básico" || this.asignation.Grado == "3ero Básico"){
      this.asignation.Jornada = "Matutina"
      if ((this.asignation.Grado != "" || this.asignation.Grado != undefined) && (this.asignation.Seccion != "" || this.asignation.Seccion != undefined) && (this.asignation.Instructor != "" || this.asignation.Instructor != undefined)) {
        this.rest.setAsignationBasicos(this.asignation).subscribe(
          res => {
            if (res.message == "Debe introducir los campos correctamente") {
              Swal.fire({ type: 'warning', title: 'Oops...', text: 'No ha llenado todos los campos, revise de nuevo', })
            } else {
              if (res.message == "Esta asignación ha sido registrada")
                Swal.fire({ type: 'warning', title: 'Oops...', text: 'La asignación ya ha sido registrada anteriormente', })
              else {
                if (res) {
                  this.getAsignation();
                  this.limpiarData();
                } else {
                  Swal.fire({ type: 'error', title: 'Oops... Something went wrong!, please, try again', })
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
      } else {
        Swal.fire({
          title: '¡Error!',
          text: "Parece que has dejado algunos campos vacios, revisa de nuevo",
          type: 'warning',
        })
      }
    }else{
      if(this.seleccionado == "" || this.seleccionado == undefined){
        Swal.fire({ type: 'warning', title: 'Oops...', text: 'No ha seleccionado una red, revise de nuevo', })
      }else{
        this.asignation.NombreRed = red.NombreRed;
        this.asignation.Inicio = red.Inicio;
        this.asignation.Finalizacion = red.Finalizacion;
        if ((this.asignation.NombreRed != "" || this.asignation.NombreRed != undefined) && (this.asignation.Curso != "" || this.asignation.Curso != undefined) && (this.asignation.Jornada != "" || this.asignation.Jornada != undefined) && (this.asignation.Grado != "" || this.asignation.Grado != undefined) && (this.asignation.Seccion != "" || this.asignation.Seccion != undefined) && (this.asignation.Instructor != "" || this.asignation.Instructor != undefined)) {
          this.rest.setAsignation(this.asignation).subscribe(
            res => {
              if (res.message == "Debe introducir los campos correctamente") {
                Swal.fire({ type: 'warning', title: 'Oops...', text: 'No ha llenado todos los campos, revise de nuevo', })
              } else {
                if (res.message == "Esta asignación ha sido registrada")
                  Swal.fire({ type: 'warning', title: 'Oops...', text: 'La asignación ya ha sido registrada anteriormente', })
                else {
                  if (res) {
                    this.getAsignation();
                    this.limpiarData();
                  } else {
                    Swal.fire({ type: 'error', title: 'Oops... Something went wrong!, please, try again', })
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
        } else {
          Swal.fire({
            title: '¡Error!',
            text: "Parece que has dejado algunos campos vacios, revisa de nuevo",
            type: 'warning',
          })
        }
      }
    }

  }

  getSeleccionado(indice) {
    return this.redes.filter((red) => red.NombreRed === indice)[0];
  }

  limpiarData() {
    this.asignation.NombreRed = "";
    this.asignation.Curso = "";
    this.asignation.Jornada = "";
    this.asignation.Grado = "";
    this.asignation.Seccion = "";
    this.asignation.Instructor = "";
  }

  // Obtener datos de combos

  getAsignation() {
    this.rest.getAsignation().subscribe(res => {
      this.asignaciones = res.Listado_de_asignaciones
    })
  }

  getStudyNet() {
    this.rest.getStudyNet().subscribe(res => {
      console.log(res);
      this.redes = res.Listado_Redes_Estudio
    })
  }

  getCourse() {
    this.rest.getCourse().subscribe(res => {
      this.cursos = res.Listado_de_cursos
    })
  }

  getInstructor() {
    this.rest.getInstructor().subscribe(res => {
      this.instructores = res.Listado_de_Instructores
    })
  }

  getGrade() {
    this.rest.getGrade().subscribe(res => {
      this.grados = res.Listado_de_Grados
    })
  }

  getSection() {
    this.rest.getSection().subscribe(res => {
      this.secciones = res.Listado_de_Secciones
    })
  }

  getJornada() {
    this.rest.getJornada().subscribe(res => {
      this.jornadas = res.Listado_de_Jornadas
    })
  }
}
