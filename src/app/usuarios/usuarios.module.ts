import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MaterialModule } from '../material/material.module';
import { UsuarioCreateComponent } from './components/usuario-create/usuario-create.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioCreateComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
