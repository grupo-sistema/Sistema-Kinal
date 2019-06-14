import { Component, OnInit } from '@angular/core';
import { Carrer } from 'src/app/models/carrer';
import { Jornada } from 'src/app/models/jornada';
import { Grade } from 'src/app/models/grade';
import { Inscription } from 'src/app/models/inscription';
import { Person } from 'src/app/models/person';
import { Unity } from 'src/app/models/unity';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';
import { Course } from 'src/app/models/course';
import { bypassSanitizationTrustStyle } from '@angular/core/src/sanitization/bypass';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  inscription: Inscription;
  inscripciones: Inscription[];
  personas: Person[];
  unidades: Unity[];
  grados: Grade[];
  cursos: Course[];
  carreras: Carrer[];
  jornadas: Jornada[];
  mostrar = false;
  inputCurso = false;
  inputGrado = false;
  inputCarrera = false;
  inputJornada = false;

  constructor(public rest: RestService) {
    this.rest.setInscription(this.inscription);
    this.inscription = new Inscription(
      "", "", "", "", "", "", ""
    );
  }

  validarETS(){
    if(this.inscription.UnidadAcademica == "ETS"){
      this.inputCurso = true;
      this.inputGrado = false;
      this.inputCarrera = false;
      this.inputJornada = false;
      this.inscription.Carrera = "";
      this.inscription.Estudiante = "";
      this.inscription.Cuota = "";
      this.inscription.Curso = "";
    }else{
      if(this.inscription.UnidadAcademica == "CETLK"){
        this.inputGrado = true;
        this.inputCurso = false;
        this.inscription.Grado = "";
        this.inscription.Estudiante = "";
        this.inscription.Cuota = "";
      }
    }
  }

   validarGrado() {
    if (this.inscription.Grado == "1ero Básico" || this.inscription.Grado == "2do Básico" || this.inscription.Grado == "3ero Básico"){
      this.inputCurso = false;
      this.inputCarrera = false;
      this.inputJornada = false;
    } else {
      if (this.inscription.Grado == "4to Diversificado" || this.inscription.Grado == "5to Diversificado" || this.inscription.Grado == "6to Diversificado"){
      this.inputCarrera = true;
      this.inputJornada = true;
      this.inscription.Carrera = "";
      this.inscription.Jornada = "";
      }
    }
  }

  ngOnInit() {
    this.getInscription();
    this.getCarrer();
    this.getUnity();
    this.getPerson();
    this.getGrade();
    this.getJornada();
    this.getCourse()
  }

  onSubmit() {
    if(this.inscription.UnidadAcademica == "CETLK"){
      if ((this.inscription.Carrera != "" || this.inscription.Carrera != undefined) && (this.inscription.UnidadAcademica != "" || this.inscription.UnidadAcademica != undefined) && (this.inscription.Jornada != "" || this.inscription.Jornada != undefined) && (this.inscription.Grado != "" || this.inscription.Grado != undefined) && (this.inscription.Cuota != "" || this.inscription.Cuota != undefined) && (this.inscription.Estudiante != "" || this.inscription.Estudiante != undefined)) {
        this.rest.setInscription(this.inscription).subscribe(
          res => {
            if (res.message == "Debe introducir los campos correctamente") {
              Swal.fire({ type: 'warning', title: 'Oops...', text: 'No ha introducido datos en todos los campos', })
            } else {
              if (res.message == "Inscripcion ya registrada")
                Swal.fire({ type: 'warning', title: 'Oops...', text: 'La incripción ya ha sido registrada anteriormente', })
              else {
                if (res) {
                  this.getInscription();
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
      if(this.inscription.UnidadAcademica == "ETS"){
        if ((this.inscription.UnidadAcademica != "" || this.inscription.UnidadAcademica != undefined) && (this.inscription.Cuota != "" || this.inscription.Cuota != undefined) && (this.inscription.Estudiante != "" || this.inscription.Estudiante != undefined)) {
          this.rest.setInscriptionets(this.inscription).subscribe(
            res => {
              if (res.message == "Debe introducir los campos correctamente") {
                Swal.fire({ type: 'warning', title: 'Oops...', text: 'No ha introducido datos en todos los campos', })
              } else {
                if (res.message == "Inscripcion ya registrada")
                  Swal.fire({ type: 'warning', title: 'Oops...', text: 'La incripción ya ha sido registrada anteriormente', })
                else {
                  if (res) {
                    this.getInscription();
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

  limpiarData() {
    this.inscription.Estudiante = "";
    this.inscription.UnidadAcademica = "";
    this.inscription.Cuota = "";
    this.inscription.Carrera = "";
    this.inscription.Jornada = "";
    this.inscription.Grado = "";
    this.inscription.Curso = "";
  }

  // Obtener datos de combos

  getInscription() {
    this.rest.getInscription().subscribe(res => {
      this.inscripciones = res.Listado_de_inscripciones
    })
  }

  getCourse() {
    this.rest.getCourse().subscribe(res => {
      this.cursos = res.Listado_de_cursos
    })
  }

  getCarrer() {
    this.rest.getCarrer().subscribe(res => {
      this.carreras = res.Listado_de_carreras
    })
  }

  getPerson() {
    this.rest.getPerson().subscribe(res => {
      this.personas = res.Usuarios_del_sistema
    })
  }

  getUnity() {
    this.rest.getUnity().subscribe(res => {
      this.unidades = res.Listado_de_unidades
    })
  }

  getGrade() {
    this.rest.getGrade().subscribe(res => {
      this.grados = res.Listado_de_Grados
    })
  }

  getJornada() {
    this.rest.getJornada().subscribe(res => {
      this.jornadas = res.Listado_de_Jornadas
    })
  }
}
