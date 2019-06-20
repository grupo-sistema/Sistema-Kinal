import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  windowHome(): void{
    if(true){
    this.router.navigate(['/home'])
  }else{
  
  }
  }

  windowPerson(): void{
    if(true){
    this.router.navigate(['/inicio'])
  }else{
  
  }
  }

  windowRegister(): void{
    if(true){
    this.router.navigate(['/register'])
  }else{
  
  }
  }

}
