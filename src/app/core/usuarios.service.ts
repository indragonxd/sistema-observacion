import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuarios } from 'src/app/models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  nameColection:string = "usuarios"
  constructor(
    private afs:AngularFirestore
  ) { 

  }
  getUsuarios(){
    return this.afs.collection(this.nameColection).snapshotChanges();
  }
  getUsuario(id:string){
    //return this.http.get<Usuarioss>(environment.url_api+`/Usuariosss/${id}`);
    return this.afs.collection(this.nameColection).doc(id).get();
  }
  createUsuarios(usuarios:Usuarios){
    //return this.http.post(environment.url_api+'/Usuariosss',Usuarioss);
    return this.afs.collection(this.nameColection).add(usuarios);
  }
  updateUsuarios(usuarios:Usuarios){
    //return this.http.put(environment.url_api+'/Usuariosss/'+id,changes);
    const id = usuarios.id;
    delete usuarios.id;
    return this.afs.doc(this.nameColection+'/'+id).update(usuarios);
  }
  deleteUsuarioss(id:string){
    //return this.http.delete(environment.url_api+`/Usuariosss/${id}`);
    return this.afs.doc(this.nameColection+'/'+id).delete();
  }

}
