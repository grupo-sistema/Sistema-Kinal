import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/models/instructor';
import { Person } from 'src/app/models/person';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent implements OnInit {
  instructor: Instructor;
  instructores: Instructor[];
  persona: Person[];

  constructor(public rest: RestService) {
    this.rest.setInstructor(this.instructor);
    this.instructor = new Instructor(
      "", "", ""
    );
  }

  ngOnInit() {
    this.getInstructor();
    this.getPerson();
  }

  getInstructor() {
    this.rest.getInstructor().subscribe(res => {
      console.log(res);
      this.instructores = res.Listado_de_Instructores
    })
  }

  getPerson() {
    this.rest.getPerson().subscribe(res => {
      console.log(res);
      this.persona = res.Usuarios_del_sistema
    })
  }

  onSubmit() {
    if ((this.instructor.Instructor != "" || this.instructor.Instructor == undefined) && this.instructor.Profesion != "") {
      console.log(this.instructor);
      this.rest.setInstructor(this.instructor).subscribe(
        res => {
          if (res.message == "instructor ya registrado") {
            Swal.fire({ type: 'warning', title: 'Oops...', text: 'El instructor ya se encuentra registrado', timer: 2000, showConfirmButton: false })
          } else {
            if (res) {
              this.getInstructor();
              this.limpiarData();
            } else {
              Swal.fire({ type: 'error', title: 'Oops... Something went wrong!, please, try again', })
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
    this.instructor.Codigo = "";
    this.instructor.Instructor = "";
    this.instructor.Profesion = "";
  }

}
