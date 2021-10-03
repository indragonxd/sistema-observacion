import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { Usuarios } from '../models/usuarios.model';
import { UsuariosService } from './usuarios.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  nameColection:string = "login"
  usuarios : Usuarios[] = [];
  loginUser:Login = {active:false,idUser:'',usuario:''};
  constructor(
    private afs:AngularFirestore,
    private usuariosService:UsuariosService,
    private router:Router
    ) 
  {
    this.fetchUsuarios();
  }
  createUser(){

  }
  login(name:string,pass:string){
    let user = this.usuarios.filter( item => {return (item.name==name && item.pass==pass ) } );
    console.log(user)
    if(user.length >=1){
      const id = user[0].id || " ";
      const name = user[0].name || "";
      this.updateLogin(id,true,name).then(
        data=> { 
          console.log(data);
          this.router.navigate(['./home']);      
        }
      );
      console.log(this.loginUser)
      //redireccionamos al home
    }else{
      alert("identificacion incorrecta")
    }
  }
  logout(){
    return this.updateLogin('',false,'');
  }
  hasUser(){
    return this.loginUser.active;
  }

  getLogin(){
    //return this.http.get<Usuarioss>(environment.url_api+`/Usuariosss/${id}`);
    return this.afs.collection(this.nameColection).doc('login').get();
  }
  updateLogin(idUser:string,estado:boolean,name:string){
    const id = 'login';
    this.loginUser = {
      active:estado,
      idUser,
      usuario:name
    }
    return this.afs.doc(this.nameColection+'/'+id).update(this.loginUser);
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
}
