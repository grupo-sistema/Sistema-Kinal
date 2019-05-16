import { Component, OnInit, DoCheck } from '@angular/core';
import { RestService } from'../../services/rest.service';
import { Person } from 'src/app/models/person';
import { Family } from 'src/app/models/family';
import Swal from 'sweetalert2';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  family: Family;
  familia: Family[];
  persona: Person[];
  search: string;
  Role: string; 
  rolesito: string;
  addFamilia;
  seleccionado;
  FamilyNameToAdd;

  constructor(public rest: RestService) {
    this.rest.setFamily(this.family);
    this.family = new Family(
    "","",[{}],[{}],[{}],[{}]
    );
   }

  ngOnInit() {
    this.getPerson();
    this.getFamily();
  }

  //===============================================================Listado del inicio de personas=====================================
  getSeleccionado(indice){
    this.seleccionado = this.persona[indice];
    console.log(this.seleccionado);
  }

  message(){
    if(this.family.FamilyName == "" || this.family.FamilyName == undefined){
      Swal.fire("Tiene que llenar el campo para poder registrar la familia");
    }else{
      if(this.family.FamilyName != "" || this.family.FamilyName != undefined){
        console.log("sii");
      }
      
    }
  }

  getPerson(){
    this.rest.getPerson().subscribe(res=>{
      console.log(res);
      this.persona = res.Usuarios_del_sistema
    })
  }

  filtrar(){
    let personaSearch = this.persona.filter(encontrado=>{
      return (encontrado.FirstName.indexOf(this.search)>-1 ||
      encontrado.SecondName.indexOf(this.search)>-1 ||
      encontrado.Surname.indexOf(this.search)>-1 ||
      encontrado.SecondSurname.indexOf(this.search)>-1);
    })
    console.log(personaSearch);
    if(this.search == ""){
      this.getPerson()      
    }else{
      this.persona = personaSearch;
    }
  }

  //===============================================================Model de familia=====================================

  getFamily(){
    this.rest.getFamily().subscribe(res=>{
      console.log(res);
      this.familia = res.Listado_de_Familias
    })
  }

  addMemberToFamily(){
    if(this.familia[this.FamilyNameToAdd].Padre.length == 1){
      Swal.fire("Ya has ingresado ese rol para ese integrante de la familia")
    }else{
      console.log("wuuuu")
    }
    this.rest.addMemberToFamily(this.rolesito, this.seleccionado._id, this.familia[this.FamilyNameToAdd]._id).subscribe(res=>{
      console.log(res);
    })
  }

  addToFamily(){
    if(this.Role == undefined){
      Swal.fire("Debe seleccionar un rol");
    }else{
      if(this.FamilyNameToAdd == undefined){
        Swal.fire("Debe seleccionar una familia");
      }else{      
      if(this.Role == "Padre"){
        this.rolesito = "Padre"
        this.addMemberToFamily();
      }else{
        if(this.Role == "Madre"){
          this.rolesito = "Madre"
          this.addMemberToFamily();
        }else{
          if(this.Role == "Encargado"){
            this.rolesito = "Encargado"
            this.addMemberToFamily();    
          }else{
            if(this.Role == "Hijo"){
              this.rolesito = "Hijo"
              this.addMemberToFamily();
            }else{
              console.log("No se que rayos hiciste para que te saliera este error...")
            }
          } 
        }
      }
    }
  }
  }

  onSubmit(){
    this.rest.setFamily(this.family).subscribe(
      response => {
        if (response) {
          this.addFamilia = false;
          this.getFamily();
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
}


