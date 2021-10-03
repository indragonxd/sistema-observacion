import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { ObservacionesService } from '../../../core/observaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehiculos } from 'src/app/models/vehiculos';
import { AuthService } from 'src/app/core/auth.service';
import { Observaciones } from 'src/app/models/observaciones';

@Component({
  selector: 'app-observacion-create',
  templateUrl: './observacion-create.component.html',
  styleUrls: ['./observacion-create.component.css']
})
export class ObservacionCreateComponent implements OnInit {

  form:FormGroup;
  id:string = '';

  constructor(
    private dialogRef:MatDialogRef<ObservacionCreateComponent>,
    private formBuilder:FormBuilder, 
    private observacionesService:ObservacionesService,
    private router:Router,
    private activateddRoute:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public dataVehiculo: Vehiculos,
    private authService:AuthService
  ) { 
    this.form = this.formBuilder.group({
      descripcion: ['',[Validators.required]],
    });
  }

  ngOnInit() {

  }

  saveObservacion(event:Event){
    event.preventDefault();//hace que no recargeg la pagina
    console.log(this.form.value)
    //traer al usuario logeado
    this.authService.getLogin().subscribe(
      data => {
        let dat:any = data.data();
        let usuario = {
          "name":dat.usuario,
          "id":dat.idUser
        }
        let des = this.form.value.descripcion;
        let observacion:Observaciones = {
          creado_por:usuario,
          descripcion:des,
          resuelto_por:{'name':'','id':''},
          estado:'registrado',
          vehiculo:this.dataVehiculo,
        }
        console.log(observacion);
        this.observacionesService.createObservaciones(observacion).then(
          data=> { 
            console.log(data);
            this.dialogRef.close();
            this.router.navigate(['./observaciones']);      
          }
        );
      }

    );
    /*
    this.observacionesService.createObservaciones(this.form.value).then(
      data=> { 
        console.log(data);
        this.dialogRef.close();
        this.router.navigate(['./vehiculos']);      
      }
    );
    */
  }
  close(){
    this.dialogRef.close();
  }
  get priceField(){
    return this.form.get('price');
  }

}
