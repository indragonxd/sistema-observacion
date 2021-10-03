import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios:Usuarios[] = [];
  form: FormGroup;
  nuevo = false;
  constructor(
    private usuariosService:UsuariosService,
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
   }

  ngOnInit() {

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
  login(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;
      this.authService.login(value.email,value.password);
    }
  }

  registrar(){
    if(this.form.valid){
      const value = {
        name:this.form.value.email,
        pass:this.form.value.password
      }
      this.usuariosService.createUsuarios(value).then(
        data => {
          //usuario creado y borrar los campos
          this.nuevo = true;
          this.form.patchValue({email:'',password:''})
        }
      );
    }
    
  }

}
