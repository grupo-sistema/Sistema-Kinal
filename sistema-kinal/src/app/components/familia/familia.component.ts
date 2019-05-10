import { Component, OnInit, DoCheck } from '@angular/core';
import { RestService } from'../../services/rest.service';
import { Person } from 'src/app/models/person';
import { Family } from 'src/app/models/family';

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
  addFamilia;
  seleccionado;
  index;
  index2;

  constructor(public rest: RestService) {
    this.rest.setFamily(this.family);
    this.family = new Family(
      "",[{}],[{}],[{}],[{}]
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

  addToFamily(indice2){
    console.log(indice2)
  }

  onSubmit(){
    this.rest.setFamily(this.family).subscribe(
      response => {
        if (response) {
          this.addFamilia = false;
          this.family.FamilyName = "";
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


