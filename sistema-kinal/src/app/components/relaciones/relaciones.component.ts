import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Family } from 'src/app/models/family';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.css']
})
export class RelacionesComponent implements OnInit {
  familia: Family[]; 

  constructor(public rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getFamilia();
  }

  getFamilia() {
    this.rest.getFamily().subscribe(res => {
      console.log(res);
      this.familia = res.Listado_de_Familias
    })
  }

  windowFamilia(): void{
    if(true){
    this.router.navigate(['/familia'])
  }else{
  
  }
  }
}
