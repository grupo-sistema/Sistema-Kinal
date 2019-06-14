import { Component, OnInit } from '@angular/core';
import { Carrer } from 'src/app/models/carrer';
import { Jornada } from 'src/app/models/jornada';
import { Grade } from 'src/app/models/grade';
import { Asignation } from 'src/app/models/asignation';
import { Seccion } from 'src/app/models/seccion';
import { Course } from 'src/app/models/course';
import { Instructor } from 'src/app/models/instructor';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';


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
  carreras: Carrer[];
  instructores: Instructor[];

  constructor(public rest: RestService) {
    this.rest.setAsignation(this.asignation);
    this.asignation = new Asignation(
      "", "", "", "", "", ""
    );
  }

  ngOnInit() {
    this.getAsignation();
    this.getCarrer();
    this.getCourse();
    this.getInstructor();
    this.getGrade();
    this.getSection();
    this.getJornada();
  }

  onSubmit() {
    if ((this.asignation.Grado != "" || this.asignation.Grado != undefined) && (this.asignation.Seccion != "" || this.asignation.Seccion != undefined) && (this.asignation.Instructor != "" || this.asignation.Instructor != undefined)) {
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

  limpiarData() {
    this.asignation.Carrera = "";
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

  getCarrer() {
    this.rest.getCarrer().subscribe(res => {
      this.carreras = res.Listado_de_carreras
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
