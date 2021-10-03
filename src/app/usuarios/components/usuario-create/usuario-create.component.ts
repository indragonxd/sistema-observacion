import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../core/usuarios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  form:FormGroup;
  id:string = '';

  constructor(
    private dialogRef:MatDialogRef<UsuarioCreateComponent>,
    private formBuilder:FormBuilder, 
    private usuariosService:UsuariosService,
    private router:Router,
    private activateddRoute:ActivatedRoute
  ) { 
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      pass: ['',[Validators.required]],
    });
  }

  ngOnInit() {

  }

  saveProduct(event:Event){
    event.preventDefault();//hace que no recargeg la pagina
    console.log(this.form.value)
    
    this.usuariosService.createUsuarios(this.form.value).then(
      data=> { 
        console.log(data);
        this.dialogRef.close();
        this.router.navigate(['./usuarios']);      
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
