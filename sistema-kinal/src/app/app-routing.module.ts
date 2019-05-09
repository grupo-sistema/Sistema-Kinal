import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CarrerasComponent } from './components/carreras/carreras.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'familia', component: FamiliaComponent},
  {path:'cursos', component: CursosComponent},
  {path:'carreras', component: CarrerasComponent},
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'**', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
