import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { HomeComponent } from './components/home/home.component';
import { RedesDeEstudioComponent } from './components/redes-de-estudio/redes-de-estudio.component';
import { InstructoresComponent } from './components/instructores/instructores.component';
import { JornadaSeccionComponent } from './components/jornada-seccion/jornada-seccion.component';
import { AsignacionCursosComponent } from './components/asignacion-cursos/asignacion-cursos.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'familia', component: FamiliaComponent},
  {path:'cursos', component: CursosComponent},
  {path:'carreras', component: CarrerasComponent},
  {path:'home', component: HomeComponent},
  {path:'redes', component: RedesDeEstudioComponent},
  {path:'instructores', component: InstructoresComponent},
  {path:'jornada', component: JornadaSeccionComponent},
  {path:'asignacionCursos', component: AsignacionCursosComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
