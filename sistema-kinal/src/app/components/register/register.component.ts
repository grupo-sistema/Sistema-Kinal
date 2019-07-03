import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario: Usuario;

  constructor(public rest: RestService, private router: Router) {
    this.rest.setRegistro(this.usuario);
    this.usuario = new Usuario(
      "", "", "", "", ""
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.usuario.Nombre != "" && this.usuario.Email != "" && this.usuario.Password != "" && this.usuario.Usuario != "" && (this.usuario.Rol != "" || this.usuario.Rol != undefined)) {
      this.rest.setRegistro(this.usuario).subscribe(
        res => {
          if (res.message == "El usuario ya existe en el sistema")
          Swal.fire({
            type: 'warning',
            title: 'Creo que ha habido un problema',
            text: 'El correo o el nombre de usuario ya se encuentra registrado'
          })
          else {
            if (res) {
              this.limpiarData();
              this.windowLogin();
              Swal.fire(
                'Cuenta registrada!',
                'Ya puedes empezar a navegar!',
                'success'
              )
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
    this.usuario.Nombre = "";
    this.usuario.Usuario = "";
    this.usuario.Password = "";
    this.usuario.Email = "";
    this.usuario.Rol = "";
  }


  windowLogin(): void{
    if(true){
    this.router.navigate(['/login'])
  }else{
  
  }
  }

}
