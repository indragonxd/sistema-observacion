import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../core/vehiculos.service';
import { Vehiculos } from '../models/vehiculos';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehiculoCreateComponent } from './components/vehiculo-create/vehiculo-create.component';
import { ObservacionCreateComponent } from '../observaciones/components/observacion-create/observacion-create.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculos[] = []
  displayedColumns: string[] = ['id', 'vim','observaciones'];
  constructor(
    private vehiculosService:VehiculosService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchVehiculos();
  }

  fetchVehiculos(){
    this.vehiculosService.getVehiculos().subscribe(
      data => {
        this.vehiculos = data.map( e => {
          const dat:any = e.payload.doc.data();
          return{
            id : e.payload.doc.id,
            ...dat
          } as Vehiculos
        })
        
      }
    )
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "40%";
    this.dialog.open(VehiculoCreateComponent,dialogConfig);
  }
  onCreateObs(vehiculo:Vehiculos){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.data = vehiculo;
    this.dialog.open(ObservacionCreateComponent,dialogConfig);
    
  }
}
