import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservacionesRoutingModule } from './observaciones-routing.module';
import { ObservacionesComponent } from './observaciones.component';
import { MaterialModule } from '../material/material.module';
import { ObservacionCreateComponent } from './components/observacion-create/observacion-create.component';
import { DeleteObservacionComponent } from './components/delete-observacion/delete-observacion.component';
import { EditObservacionComponent } from './components/edit-observacion/edit-observacion.component';


@NgModule({
  declarations: [
    ObservacionesComponent,
    ObservacionCreateComponent,
    DeleteObservacionComponent,
    EditObservacionComponent
  ],
  imports: [
    CommonModule,
    ObservacionesRoutingModule,
    MaterialModule
  ]
})
export class ObservacionesModule { }
