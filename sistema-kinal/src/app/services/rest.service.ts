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

    setPerson(person_guardar): Observable<any>{
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

  setCourse(course_guardar): Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(course_guardar);
    return this.http.post(this.endpoint + '/save-course', params,this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO CURSOS=======================================
  getCarrer(): Observable<any>{
    return this.http.get(this.endpoint + '/list-carrer').pipe(map(this.extractData));
  }

  setCarrer(carrer_guardar): Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(carrer_guardar);
    return this.http.post(this.endpoint + '/save-carrer', params,this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO FAMILIA=======================================

  setFamily(family_guardar):Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(family_guardar);
    return this.http.post(this.endpoint + '/save-family', params,this.httpOptions).pipe(map(this.extractData));
  }

  addMemberToFamily(role, id_user, id_family){
    console.log(this.mensaje);
    var campo = role;
    {id_user}

    if(campo == "Padre"){
      return this.http.post(this.endpoint + '/insert-member/' + id_family, {Padre: id_user},this.httpOptions).pipe(map(this.extractData));
    }else{
      if(campo == "Madre"){
        return this.http.post(this.endpoint + '/insert-member/' + id_family, {Madre: id_user},this.httpOptions).pipe(map(this.extractData));
      }else{
        if(campo == "Encargado"){
          return this.http.post(this.endpoint + '/insert-member/' + id_family, {Encargado: id_user},this.httpOptions).pipe(map(this.extractData));
        }else{
          if(campo == "Hijo"){
            return this.http.post(this.endpoint + '/insert-member/' + id_family, {Hijo: id_user},this.httpOptions).pipe(map(this.extractData));
          }else{
            
          } 
        } 
      }
    }
  }

  getFamily(): Observable<any>{
    return this.http.get(this.endpoint + '/list-family').pipe(map(this.extractData));
  }
  
  // ==============================================================================MODULO STUDY NETWORK=======================================
  
  getStudyNet(): Observable<any>{
    return this.http.get(this.endpoint + '/list-study_net').pipe(map(this.extractData));
  }

  setStudyNet(studyNet_guardar): Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(studyNet_guardar);
    return this.http.post(this.endpoint + '/save-study_net', params,this.httpOptions).pipe(map(this.extractData));
  }

}
