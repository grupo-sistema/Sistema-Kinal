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

  getPerson(): Observable<any>{
    return this.http.get(this.endpoint + '/list-person').pipe(map(this.extractData));
  }

  setPerson(person_guardar){
    console.log(this.mensaje);
    var params = JSON.stringify(person_guardar);
    return this.http.post(this.endpoint + '/save-person', params,this.httpOptions).pipe(map(this.extractData));
  }
}
