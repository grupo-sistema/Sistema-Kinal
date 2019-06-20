import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { HomeComponent } from './components/home/home.component';
import { RedesDeEstudioComponent } from './components/redes-de-estudio/redes-de-estudio.component';
import { InstructoresComponent } from './components/instructores/instructores.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'familia', component: FamiliaComponent},
  {path:'cursos', component: CursosComponent},
  {path:'carreras', component: CarrerasComponent},
  {path:'home', component: HomeComponent},
  {path:'redes', component: RedesDeEstudioComponent},
  {path:'instructores', component: InstructoresComponent},
  {path:'inscripcion', component: InscripcionComponent},
  {path:'asignacion', component: AsignacionComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
