import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObservacionesService } from '../../../core/observaciones.service';
import { Router, } from '@angular/router';
import { Observaciones } from 'src/app/models/observaciones';

@Component({
  selector: 'app-delete-observacion',
  templateUrl: './delete-observacion.component.html',
  styleUrls: ['./delete-observacion.component.css']
})
export class DeleteObservacionComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<DeleteObservacionComponent>,
    private observacionesService:ObservacionesService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public dataObs: Observaciones,
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  deleteObs(){
    let data = this.dataObs.id || '';
    this.observacionesService.deleteObservacioness(data).then(
      data => {
        this.close();
        this.router.navigate(['./observaciones']);
      }
    )
  }
}
