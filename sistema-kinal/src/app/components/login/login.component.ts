import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;

  constructor( private router: Router, public rest: RestService) { 
    this.rest.login(this.login);
    this.login = new Login(
      "",""
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.login.Email != "" &&  this.login.Password != "") {
      this.rest.login(this.login).subscribe(
        res => {
          if (res.message == "correo o usuario no encontrado" || res.message == "contra incorrecta")
            Swal.fire({ type: 'error', title: 'Oops...', text: 'Correo, usuario o contraseña incorrectos', })
          else {
              if (res) {
                this.windowPerson();
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
    }else {
      Swal.fire({
        title: '¡Error!',
        text: "Parece que has dejado algunos campos vacios, revisa de nuevo",
        type: 'warning',
      })
    }
  }

  limpiarData() {
    this.login.Email = "";
    this.login.Password = "";
  }

  windowHome(){
    if(true){
    this.router.navigate(['/home'])
  }else{
  
  }
  }

  windowPerson(){
    if(true){
    this.router.navigate(['/inicio'])
  }else{
  
  }
  }

  windowRegister(){
    if(true){
    this.router.navigate(['/register'])
  }else{
  
  }
  }

}
