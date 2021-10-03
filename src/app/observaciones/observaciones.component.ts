import { Component, OnInit } from '@angular/core';
import { ObservacionesService } from '../core/observaciones.service';
import { Observaciones } from '../models/observaciones';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteObservacionComponent } from './components/delete-observacion/delete-observacion.component';
import { EditObservacionComponent } from './components/edit-observacion/edit-observacion.component';
import { Router, } from '@angular/router';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  observaciones: Observaciones[] = []
  displayedColumns: string[] = ['id', 'descripcion','vim','estado','registradopor','actualizadopor','acciones'];
  categories:String[] = ['Editar','Aceptar','Rechazar','Eliminar'];
  select:String = '';
  constructor(
    private observacionesService:ObservacionesService,
    private dialog:MatDialog,
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.fetchObservaciones();
  }
  fetchObservaciones(){
    this.observacionesService.getObservaciones().subscribe(
      data => {
        this.observaciones = data.map( e => {
          const dat:any = e.payload.doc.data();
          return{
            id : e.payload.doc.id,
            ...dat
          } as Observaciones
        })
        
      }
    )
  }

  categorySelected(event:Event,observacion:Observaciones){
    let eventString = event.toString();
    console.log(eventString)
    if(eventString == "Aceptar"){
      observacion.estado ="Aceptado"
      this.authService.getLogin().subscribe(
        data => {
          let dat:any = data.data();
          let usuario = {
            "name":dat.usuario,
            "id":dat.idUser
          }
          observacion.resuelto_por = usuario;
          this.observacionesService.updateObservaciones(observacion).then(
            data =>{
              this.router.navigate(['./observaciones']);
            }
          )
        }
      );
    }
    if(eventString == "Rechazar"){
      observacion.estado ="Rechazado"
      this.authService.getLogin().subscribe(
        data => {
          let dat:any = data.data();
          let usuario = {
            "name":dat.usuario,
            "id":dat.idUser
          }
          observacion.resuelto_por = usuario;
          this.observacionesService.updateObservaciones(observacion).then(
            data =>{
              this.router.navigate(['./observaciones']);
            }
          )
        }
      );

    }
    if(eventString == "Editar"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "40%";
      dialogConfig.data = observacion;
      this.dialog.open(EditObservacionComponent,dialogConfig);
    }
    if(eventString == "Eliminar"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "40%";
      dialogConfig.data = observacion;
      this.dialog.open(DeleteObservacionComponent,dialogConfig);
    }

  }

}
