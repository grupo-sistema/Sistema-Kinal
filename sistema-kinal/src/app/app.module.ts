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
import { JornadaSeccionComponent } from './components/jornada-seccion/jornada-seccion.component';

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
    JornadaSeccionComponent,
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
