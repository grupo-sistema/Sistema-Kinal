import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { HomeComponent } from './components/home/home.component';
import { RedesDeEstudioComponent } from './components/redes-de-estudio/redes-de-estudio.component';
import { InstructoresComponent } from './components/instructores/instructores.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RelacionesComponent } from './components/relaciones/relaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FamiliaComponent,
    CarrerasComponent,
    CursosComponent,
    HomeComponent,
    RedesDeEstudioComponent,
    InstructoresComponent,
    AsignacionComponent,
    InscripcionComponent,
    LoginComponent,
    RegisterComponent,
    RelacionesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
