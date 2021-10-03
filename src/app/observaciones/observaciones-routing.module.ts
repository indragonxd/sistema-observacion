import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservacionesComponent } from './observaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ObservacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacionesRoutingModule { }
