import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../core/usuarios.service';
import { Usuarios } from '../models/usuarios.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsuarioCreateComponent } from './components/usuario-create/usuario-create.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuarios[] = []
  displayedColumns: string[] = ['id', 'empleado'];
  constructor(
    private usuariosService:UsuariosService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.fetchUsuarios();
  }
  fetchUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.usuarios = data.map( e => {
          const dat:any = e.payload.doc.data();
          return{
            id : e.payload.doc.id,
            ...dat
          } as Usuarios
        })
        
      }
    )
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "40%";
    this.dialog.open(UsuarioCreateComponent,dialogConfig);
  }
}
