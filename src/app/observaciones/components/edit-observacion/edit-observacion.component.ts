import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObservacionesService } from '../../../core/observaciones.service';
import { Router, } from '@angular/router';
import { Observaciones } from 'src/app/models/observaciones';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-observacion',
  templateUrl: './edit-observacion.component.html',
  styleUrls: ['./edit-observacion.component.css']
})
export class EditObservacionComponent implements OnInit {
  
  form:FormGroup;
  constructor(
    private dialogRef:MatDialogRef<EditObservacionComponent>,
    private observacionesService:ObservacionesService,
    private router:Router,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataObs: Observaciones,
  ) {
    let des = this.dataObs.descripcion;
    console.log(des);
    this.form = this.formBuilder.group({
      descripcion: ['',[Validators.required]],
    });
    this.form.patchValue({'descripcion':des});
   }

  ngOnInit(): void {

  }
  close(){
    this.dialogRef.close();
  }
  editObs(event:Event){
    event.preventDefault();
    this.dataObs.descripcion = this.form.value.descripcion;
    this.observacionesService.updateObservaciones(this.dataObs).then(
      data => {
        this.close();
        this.router.navigate(['./observaciones']);
      }
    )
  }
}
