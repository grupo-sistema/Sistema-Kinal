import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'http://localhost:3789/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  mensaje = 'Persona guardada';

  constructor(private http: HttpClient) {}

  private extractData(res: Response){
    let body = res;
    return body || [ ] || { };
  }

  // ==============================================================================MODULO PERSONA=======================================

  getPerson(): Observable<any>{
    return this.http.get(this.endpoint + '/list-person').pipe(map(this.extractData));
  }

  setPerson(person_guardar){
    console.log(this.mensaje);
    var params = JSON.stringify(person_guardar);
    return this.http.post(this.endpoint + '/save-person', params,this.httpOptions).pipe(map(this.extractData));
  }

  searchPerson(search){
    return this.http.post(this.endpoint + '/search-person', {search}, this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO CURSOS=======================================
  getCourse(): Observable<any>{
    return this.http.get(this.endpoint + '/list-course').pipe(map(this.extractData));
  }

  setCourse(course_guardar){
    console.log(this.mensaje);
    var params = JSON.stringify(course_guardar);
    return this.http.post(this.endpoint + '/save-course', params,this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO FAMILIA=======================================

  setFamily(family_guardar){
    console.log(this.mensaje);
    var params = JSON.stringify(family_guardar);
    return this.http.post(this.endpoint + '/save-family', params,this.httpOptions).pipe(map(this.extractData));
  }

  updateFamily(family_update, id_family){
    console.log(this.mensaje);
    var params = JSON.stringify(family_update);
    return this.http.post(this.endpoint + '/update-family/' + id_family , params,this.httpOptions).pipe(map(this.extractData));
  }

  getFamily(): Observable<any>{
    return this.http.get(this.endpoint + '/list-family').pipe(map(this.extractData));
  }
  
}
