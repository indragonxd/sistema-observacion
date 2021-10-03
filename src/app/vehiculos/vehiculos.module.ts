import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { VehiculosComponent } from './vehiculos.component';
import { MaterialModule } from '../material/material.module';
import { VehiculoCreateComponent } from './components/vehiculo-create/vehiculo-create.component';

@NgModule({
  declarations: [
    VehiculosComponent,
    VehiculoCreateComponent

  ],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    MaterialModule
  ]
})
export class VehiculosModule { }
