import { Component, OnInit, DoCheck } from '@angular/core';
import { RestService } from'../../services/rest.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  persona: Person[];
  search: string;
  seleccionado;
  index;

  constructor(public rest: RestService) {
   }

  ngOnInit() {
    this.getPerson();
  }

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
}
