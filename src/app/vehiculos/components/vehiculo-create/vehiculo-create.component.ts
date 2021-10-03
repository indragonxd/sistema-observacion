import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from '../../../core/vehiculos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.component.html',
  styleUrls: ['./vehiculo-create.component.css']
})
export class VehiculoCreateComponent implements OnInit {
  form:FormGroup;
  id:string = '';

  constructor(
    private dialogRef:MatDialogRef<VehiculoCreateComponent>,
    private formBuilder:FormBuilder, 
    private vehiculosService:VehiculosService,
    private router:Router,
    private activateddRoute:ActivatedRoute
  ) { 
    this.form = this.formBuilder.group({
      vim: ['',[Validators.required]],
    });
  }

  ngOnInit() {

  }

  saveVehiculo(event:Event){
    event.preventDefault();//hace que no recargeg la pagina
    console.log(this.form.value)
    
    this.vehiculosService.createVehiculos(this.form.value).then(
      data=> { 
        console.log(data);
        this.dialogRef.close();
        this.router.navigate(['./vehiculos']);      
      }
    );
    
  }
  close(){
    this.dialogRef.close();
  }
  get priceField(){
    return this.form.get('price');
  }

}
