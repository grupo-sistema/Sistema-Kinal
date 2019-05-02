import { Component, OnInit, Input, Output } from '@angular/core';
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

  constructor(public rest: RestService) {
   }

  ngOnInit() {
    this.getPerson();
  }

  getPerson(){
    this.rest.getPerson().subscribe(res=>{
      console.log(res);
      this.persona = res.Usuarios_del_sistema
    })
  }

  filtrar(){
    let personaSearch = this.persona.filter(encontrado=>{
      return (encontrado.FirstName.indexOf(this.search)>-1);
    })
    console.log(personaSearch);
    if(this.search == ""){
      this.getPerson()      
    }else{
      this.persona = personaSearch;
    }
  }
}
