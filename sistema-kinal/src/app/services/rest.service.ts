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

  // ==============================================================================MODULO INSTRUCTOR=======================================
  getInstructor(): Observable<any>{
    return this.http.get(this.endpoint + '/list-instructor').pipe(map(this.extractData));
  }

  setInstructor(instructor_guardar):Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(instructor_guardar);
    return this.http.post(this.endpoint + '/save-instructor', params,this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO ASIGNACION======================================= 
  getAsignation(): Observable<any>{
    return this.http.get(this.endpoint + '/list-asignation').pipe(map(this.extractData));
  }

  setAsignation(asignation_guardar): Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(asignation_guardar);
    return this.http.post(this.endpoint + '/save-asignation', params,this.httpOptions).pipe(map(this.extractData));
  }

  // ==============================================================================MODULO ASIGNACION=======================================
  getInscription(): Observable<any>{
    return this.http.get(this.endpoint + '/list-inscription').pipe(map(this.extractData));
  }

  setInscription(inscription_guardar): Observable<any>{
    console.log(this.mensaje);
    var params = JSON.stringify(inscription_guardar);
    return this.http.post(this.endpoint + '/save-inscription', params,this.httpOptions).pipe(map(this.extractData));
  }
// ==============================================================================MODULO SECCION, GRADO, JORNADA, UNIDAD=======================================
  getSection(): Observable<any>{
    return this.http.get(this.endpoint + '/list-section').pipe(map(this.extractData));
  }

  getGrade(): Observable<any>{
    return this.http.get(this.endpoint + '/list-grade').pipe(map(this.extractData));
  }

  getJornada(): Observable<any>{
    return this.http.get(this.endpoint + '/list-jornada').pipe(map(this.extractData));
  }

  getUnity(): Observable<any>{
    return this.http.get(this.endpoint + '/list-unity').pipe(map(this.extractData));
  }

}
