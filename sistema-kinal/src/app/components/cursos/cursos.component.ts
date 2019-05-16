import { Component, OnInit } from '@angular/core';
import { Course } from "src/app/models/course";
import { RestService } from "../../services/rest.service";
import { count } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
course: Course;
cursos: Course[];

  constructor(public rest: RestService) { 
    this.rest.setCourse(this.course);
    this.course = new Course(
      "","",""
    );
  }

  ngOnInit() {
    this.getCourse();
  }

  getCourse(){
    this.rest.getCourse().subscribe(res=>{
      console.log(res);
      this.cursos = res.Listado_de_cursos
    })
  }

  onSubmit() {
    if(this.course.Codigo != "" && this.course.Descripcion != "" && this.course.Nombre != ""){
    this.rest.setCourse(this.course).subscribe(
      response => {
        if (response) {
          this.getCourse();
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
    this.course.Nombre = "";
    this.course.Descripcion = "";
    this.course.Codigo = "";
  }
}
