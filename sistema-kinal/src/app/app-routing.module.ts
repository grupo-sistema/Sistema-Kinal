import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { UnidadesacademicasComponent } from './components/unidadesacademicas/unidadesacademicas.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent},
  {path:'familia', component: FamiliaComponent},
  {path:'unidadesacademicas', component: UnidadesacademicasComponent},
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'**', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
